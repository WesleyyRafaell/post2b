import Header from '../../components/Header';
import List from '../../components/List';
import './style.css';

export default function Workspace() {
  return (
    <>
      <Header button={false} />
      <h3>Projeto 1</h3>
      <div className="containerTasks">
        <List />
        <List />
        <List />
      </div>
    </>
  )
}