import Board from './components/Board';
import Header from './components/Header';
import ModalComponent from './components/ModalComponent';
import { ModalProvider } from './contexts/ModalContext';
import './styles/global.css';

import './temporarycss.css'

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Header />
        <div className="containerBoards">
          <h2>Meus quadros</h2>
          <div className="boards">
            <Board name="Projeto 1" />
            <Board name="Projeto 2" />
            <Board name="Projeto 3" />
          </div>
        </div>

        <ModalComponent />
      </ModalProvider>
    </div>
  );
}

export default App;
