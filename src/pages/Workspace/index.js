import { useEffect, useState } from 'react';
import produce from 'immer';
import { useLocation } from "react-router-dom";
import { DragContext } from '../../contexts/DragContext';
import firebase from '../../services/firebaseConnection';

// components
import Header from '../../components/Header';
import List from '../../components/List';

import './style.css';

export default function Workspace() {
  const { state } = useLocation();

  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState('')

  useEffect(() => {
    (async function () {
      await firebase.firestore()
        .collection('Boards')
        .doc(state.id)
        .get()
        .then((snapshot) => {
          setTitle(snapshot.data().title)
          setLists(snapshot.data().lists)
        })
        .catch((error) => {
          console.error('deu ruim:', error)
        })
    })()
  }, [])

  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);

    }))
  }

  function add(fromList, toList, from) {
    setLists(produce(lists, draft => {
      if (draft[toList].cards.length !== 0) { return }
      const dragged = draft[fromList].cards[from];
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(0, 0, dragged);
    }))
  }

  if(lists.length === 0) {
    return(
      <div />
    )
  }

  return (
    <>
      <Header button={false} />

      <DragContext.Provider value={{
        lists,
        move,
        add
      }}>
        <div className="containerWorkspace">
          <h2>{title}</h2>
          {console.log(lists)}
          <div className="containerTasks">
            {lists.map((item, index) => <List
              key={item.title}
              title={item.title}
              data={item.cards}
              listIndex={index}
              newTask={item.newTask}
            />)}
          </div>
        </div>
      </DragContext.Provider>
    </>
  )
}