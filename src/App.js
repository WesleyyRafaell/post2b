import { ModalProvider } from './contexts/ModalContext';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Routes from './routes';
import './styles/global.css';
import { DragProvider } from './contexts/DragContext';

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes />
        </DndProvider>
      </ModalProvider>
    </div>
  );
}

export default App;
