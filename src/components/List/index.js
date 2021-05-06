import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import Input from '../Input';
import { Controller, useForm } from 'react-hook-form';
import Card from '../Card';
import * as yup from "yup";

import './style.css';
import ModalComponent from '../ModalComponent';
import { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';

const schema = yup.object().shape({
  board: yup.string().required('O campo não pode ficar vazio'),
})

export default function List({ newTask, title, data }) {

  const { handleOpen } = useContext(ModalContext)

  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });


  return (
    <div className="listTasks">
      <header>
        <h3>{title}</h3>
      </header>
      <ul>
        {data.map(item => (
          <li><Card key={item.id} content={item.content} /></li>
        ))}
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
                    name="board"
                    control={control}
                    defaultValue=''
                  />
                </div>
                <div className="controllInput">
                  <Controller
                    render={({ field }) =>
                      <Input label="Descrição" {...field} />
                    }
                    name="board"
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