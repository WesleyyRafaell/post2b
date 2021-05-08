import { DragContext } from '../../contexts/DragContext';

// components
import Header from '../../components/Header';
import List from '../../components/List';

import './style.css';
import { useContext } from 'react';

export default function Workspace() {
  const { lists } = useContext(DragContext);

  return (
    <>
      <Header button={false} />

      <div className="containerWorkspace">
        <h2>Projeto 1</h2>
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
    </>
  )
}