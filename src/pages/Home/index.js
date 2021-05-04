import Board from '../../components/Board';
import Input from '../../components/Input';
import Button from '@material-ui/core/Button';
import ModalComponent from '../../components/ModalComponent';

import './style.css'

export default function Home() {
  return (
    <>
      <div className="containerBoards">
        <h2>Meus quadros</h2>
        <div className="boards">
          <Board name="Projeto 1" />
          <Board name="Projeto 2" />
          <Board name="Projeto 3" />
        </div>
      </div>

      <ModalComponent>
        <div className="containerNewBoard">
          <h3>Novo quadro</h3>
          <form action="">
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
