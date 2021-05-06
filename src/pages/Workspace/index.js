import Header from '../../components/Header';
import List from '../../components/List';
import './style.css';

import loadLists from '../../services/api';

const lists = loadLists();

export default function Workspace() {
  return (
    <>
      <Header button={false} />
      <div className="containerWorkspace">
        <h2>Projeto 1</h2>
        <div className="containerTasks">
          {lists.map(item => <List key={item.id} newTask={item.newTask} title={item.title} data={item.cards} />)}          
        </div>
      </div>
    </>
  )
}