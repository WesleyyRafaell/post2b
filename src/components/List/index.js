import { useContext, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { uid } from 'uid';
import firebase from '../../services/firebaseConnection';
import produce from 'immer';

import { ModalContext } from '../../contexts/ModalContext';

// components 
import Card from '../Card';
import {Input} from '../Input';
import ModalComponent from '../ModalComponent';
import { DragContext } from '../../contexts/DragContext';

import './style.css';

import schema from '../../services/schemas/TaskSchema';

export default function List({ newTask, title, data, boardIndex, listIndex }) {

  const { handleOpen, handleClose } = useContext(ModalContext);
  const { lists, setLists, add } = useContext(DragContext)

  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });


  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;

      if (draggedListIndex === targetListIndex) { return }

      add(draggedListIndex, targetListIndex, draggedIndex);

      item.listIndex = targetListIndex;
      item.index = 0;

    }
  })

  useEffect(() => {
    (
      async () => {
        await firebase.firestore().collection('Boards')
          .doc(boardIndex)
          .update({
            lists
          })
          .catch((error) => {
            console.error('deu ruim:', error)
          })
      }
    )()
  }, [lists, boardIndex])


  async function handleNewTask(dataForm) {
    const { titleTask, contentTask } = dataForm;
    const newmItemId = uid();

    const item = {
      id: newmItemId,
      title: titleTask,
      content: contentTask,
      tags: []
    }

    setLists(produce(lists, draft => {
      draft[0].cards.push(item);
    }))

    handleClose();
    reset();
  }

  return (
    <div className="listTasks">
      <header>
        <h3>{title}</h3>
      </header>
      <ul ref={dropRef}>
        {data.map((item, index) => {
          return (
            <li key={item.id}>
              <Card
                id={item.id}
                index={index}
                title={item.title}
                content={item.content}
                listIndex={listIndex}
                tags={item.tags}
              />
            </li>
          )
        })}
      </ul>

      {newTask ?
        <div className="formNewTask">
          <div className="buttonNewTask">
            <Button onClick={handleOpen} variant="contained" color="primary">
              Nova tarefa
            </Button>
          </div>
          <ModalComponent>
            <div className="containerNewBoard">
              <h3>Nova tarefa</h3>
              <form onSubmit={handleSubmit(handleNewTask)}>
                <div className="controllInput">
                  <Controller
                    render={({ field }) =>
                      <Input label="Título" {...field} />
                    }
                    name="titleTask"
                    control={control}
                    defaultValue=''
                  />
                  {errors.titleTask?.message}
                </div>
                <div className="controllInput">
                  <Controller
                    render={({ field }) =>
                      <Input label="Descrição" {...field} />
                    }
                    name="contentTask"
                    control={control}
                    defaultValue=''
                  />
                  {errors.contentTask?.message}
                </div>
                <div className="buttonSubmit">
                  <Button fullWidth={true} type="submit" variant="contained" color="primary">
                    Criar
                  </Button>
                </div>
              </form>
            </div>
          </ModalComponent>
        </div>
        :
        <div className="formNewTask" />
      }
    </div>
  )
}