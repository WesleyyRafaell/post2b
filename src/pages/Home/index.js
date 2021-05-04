import { useEffect, useState } from 'react';
import Board from '../../components/Board';
import Input from '../../components/Input';
import Button from '@material-ui/core/Button';
import ModalComponent from '../../components/ModalComponent';

import firebase from '../../services/firebaseConnection';

import './style.css'

export default function Home() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    try {
      (
        async () => {
          await firebase.firestore().collection('Boards')
          .get()
          .then((snapshot)=> {
            const list = [];

            snapshot.forEach((doc)=> {
              list.push(doc.data().Title)
            })
    
            setBoards(list)
    
          })
        }

      )()
    } catch (error) {
      console.log('Error:', error )
    }
  }, [])


  return (
    <>
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
          <form>
            <div className="controllInput">
              <Input label="Nome" />
            </div>
            <div className="buttonSubmit">
              <Button variant="contained" color="primary">
                Criar
              </Button>
            </div>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}
