import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { ModalContext } from '../../contexts/ModalContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalComponent({ children }) {
  const classes = useStyles();

  const { open, handleClose } = useContext(ModalContext)

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        {children}
      </div>
    </Modal>
  )
}