import { useContext } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import logo from '../../assets/images/logo.png';

import './style.css';
import { ModalContext } from '../../contexts/ModalContext';

export default function Header() {
  const { handleOpen } = useContext(ModalContext)
  
  return (
    <header>
      <div />
      <img src={logo} alt="logo post2b" />
      <Button color="secondary" variant="contained" onClick={handleOpen}>
        <AddIcon />
      </Button>
    </header>
  )
}