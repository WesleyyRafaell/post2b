import { useContext } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

import './style.css';
import { ModalContext } from '../../contexts/ModalContext';

export default function Header({ button }) {
  const { handleOpen } = useContext(ModalContext)

  return (
    <header>
      <div />
      <Link to="/">
        <img src={logo} alt="logo post2b" />
      </Link>
      {button === true 
        ?
        <Button color="secondary" variant="contained" onClick={handleOpen}>
          <AddIcon />
        </Button>
        :
        <div />
      }
    </header>
  )
}