import { useState, createContext } from 'react';
import produce from 'immer';
import loadLists from '../services/api';

export const DragContext = createContext({});

const data = loadLists();

export function DragProvider({ children }) {
  const [lists, setLists] = useState(data);

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

  return (
    <DragContext.Provider value={{
      lists,
      move,
      add
    }}>
      {children}
    </DragContext.Provider>
  )
}