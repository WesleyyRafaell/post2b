import { useContext, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import firebase from '../../services/firebaseConnection';
import { ModalContext } from '../../contexts/ModalContext';

// components 
import Board from '../../components/Board';
import Input from '../../components/Input';
import ModalComponent from '../../components/ModalComponent';
import Header from '../../components/Header';

import './style.css';

import schema from '../../services/schema';

export default function Home() {
  const history = useHistory();

  const [boards, setBoards] = useState([]);

  const { handleClose } = useContext(ModalContext)

  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    try {
      (
        async () => {
          await firebase.firestore().collection('Boards')
            .get()
            .then((snapshot) => {
              const list = [];

              snapshot.forEach((doc) => {
                list.push(doc.data().Title)
              })

              setBoards(list)

            })
        }

      )()
    } catch (error) {
      console.log('Error:', error)
    }
  }, [])

  async function handleNewBoard(data) {
    const { board } = data;
    
    await firebase.firestore()
    .collection('Boards')
    .add({
      Title: board
    })
    .then(() => {
      console.log('dados cadastrados com sucesso');
      
      handleClose();
      history.push('/workspace');
    })
    .catch((error) => {
      console.error('deu ruim:', error)
    })
  }

  return (
    <>
      <Header button={true} />

      <div className="containerBoards">
        <h2>Meus quadros</h2>
        <div className="boards">
          {boards.map((item, index) => (
            <Board key={index} name={item} />
          ))}
        </div>
      </div>

      <ModalComponent>
        <div className="containerNewBoard">
          <h3>Novo quadro</h3>
          <form onSubmit={handleSubmit(handleNewBoard)}>
            <div className="controllInput">
              <Controller
                render={({ field }) =>
                  <Input label="Nome" {...field} />
                }
                name="input"
                control={control}
                defaultValue=''
              />
              {errors.input?.message}
            </div>
            <div className="buttonSubmit">
              <Button type="submit" variant="contained" color="primary">
                Criar
              </Button>
            </div>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}
