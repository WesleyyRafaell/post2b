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

  useEffect(() => {

    (async function () {
      await firebase.firestore()
        .collection('Boards')
        .doc(state.id)
        .get()
        .then((snapshot) => {
          setLists(snapshot.data().lists);
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

  function add(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.push(dragged);
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
        setLists,
        move,
        add
      }}>
        <div className="containerWorkspace">
          <h2>{state.title}</h2>
          <div className="containerTasks">
            {lists.map((item, index) => <List
              key={item.title}
              title={item.title}
              data={item.cards}
              listIndex={index}
              boardIndex={state.id}
              newTask={item.newTask}
            />)}
          </div>
        </div>
      </DragContext.Provider>
    </>
  )
}