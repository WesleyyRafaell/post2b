import { ModalProvider } from './contexts/ModalContext';
import Routes from './routes';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </div>
  );
}

export default App;
