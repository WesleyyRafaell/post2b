import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { useDrop } from 'react-dnd';

import { ModalContext } from '../../contexts/ModalContext';

// components 
import Card from '../Card';
import Input from '../Input';
import ModalComponent from '../ModalComponent';
import { DragContext } from '../../contexts/DragContext';

import './style.css';

import schema from '../../services/schema';

export default function List({ newTask, title, data, listIndex }) {

  const { handleOpen } = useContext(ModalContext);
  const { add } = useContext(DragContext)

  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });


  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      
      const draggedIndex = item.index;
      
      if(draggedListIndex === targetListIndex) {return}

      add(draggedListIndex, targetListIndex, draggedIndex)

    }
  })

  return (
    <div className="listTasks">
      <header>
        <h3>{title}</h3>
      </header>
      <ul ref={dropRef}>
        {data.map((item, index) => (
          <li key={item.id}>
            <Card
              id={item.id}
              index={index}
              content={item.content}
              listIndex={listIndex}
            />
          </li>
        ))
        }
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
              <form>
                <div className="controllInput">
                  <Controller
                    render={({ field }) =>
                      <Input label="Título" {...field} />
                    }
                    name="input"
                    control={control}
                    defaultValue=''
                  />
                </div>
                <div className="controllInput">
                  <Controller
                    render={({ field }) =>
                      <Input label="Descrição" {...field} />
                    }
                    name="input"
                    control={control}
                    defaultValue=''
                  />
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