import { useContext, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from '../../services/firebaseConnection';
import { ModalContext } from '../../contexts/ModalContext';

// components 
import Board from '../../components/Board';
import Input from '../../components/Input';
import ModalComponent from '../../components/ModalComponent';
import Header from '../../components/Header';

import './style.css';

import schema from '../../services/schema';

const lists = [
  {
    cards: [],
    newTask: true,
    title: 'todo'
  },
  {
    cards: [],
    newTask: false,
    title: 'doing'
  },
  {
    cards: [],
    newTask: false,
    title: 'done'
  },
]

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

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
                list.push({
                  id: doc.id,
                  title: doc.data().title
                })
              })

              setBoards(list)
              setReloadPage(false)
            })
        }

      )()
    } catch (error) {
      console.log('Error:', error)
    }
  }, [reloadPage])

  async function handleNewBoard(data) {
    const { input } = data;

    await firebase.firestore()
      .collection('Boards')
      .add({
        title: input,
        lists
      })
      .then(() => {
        handleClose();
        setReloadPage(true)
      })
      .catch((error) => {
        console.error('deu ruim:', error)
      })
  }

  async function handleDeleteBoard(idBoard) {
    await firebase.firestore().collection('Boards').doc(idBoard)
      .delete()
      .then(() => {
        setReloadPage(true)
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
          {boards.map(({ id, title }) => (
            <div key={id} className="boardItem">
              <div className="buttonDeleteBoard" onClick={() => handleDeleteBoard(id)}>
                <Button color="secondary">
                  <DeleteIcon />
                </Button>
              </div>
              <Link to={{
                pathname: '/workspace',
                state: { id }
              }}>
                <Board name={title} />
              </Link>
            </div>
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
