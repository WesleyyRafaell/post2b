import Task from "../Task";

import './style.css';

export default function List() {
  return (
    <div className="listTasks">
      <header>
        <h3>Tarefas</h3>
      </header>
      <ul>
        <li><Task /></li>
        <li><Task /></li>
        <li><Task /></li>
        <li><Task /></li>
        <li><Task /></li>
      </ul>
    </div>
  )
}