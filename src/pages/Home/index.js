import Board from '../../components/Board';
import Header from '../../components/Header';
import ModalComponent from '../../components/ModalComponent';
import { ModalProvider } from '../../contexts/ModalContext';

import './style.css'

export default function Home() {
  return (
    <>
      <Header />
      
      <div className="containerBoards">
        <h2>Meus quadros</h2>
        <div className="boards">
          <Board name="Projeto 1" />
          <Board name="Projeto 2" />
          <Board name="Projeto 3" />
        </div>
      </div>

      <ModalComponent>
        <h2>Novo quadro</h2>
        <p>react-transition-group animates me.</p>
      </ModalComponent>
    </>
  );
}
