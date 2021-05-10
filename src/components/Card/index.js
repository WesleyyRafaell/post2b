import { useContext, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragContext } from '../../contexts/DragContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import produce from 'immer';


import './style.css';

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
    padding: theme.spacing(1, 1, 1),
  },
}));

export default function Card({ id, index, title, content, listIndex }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const ref = useRef();

  const { lists, move, setLists } = useContext(DragContext)

  function handleOpenModalInCard() {
    setOpenModal(true);
  }

  function handleCloseModalInCard() {
    setOpenModal(false)
  }

  function handleOpenDeleteModal() {
    setOpenDeleteModal(true)
  }

  function handleCloseDeleteModal() {
    setOpenDeleteModal(false)
  }

  function handleDeleteTask() {
    setLists(produce(lists, draft => {
      draft[listIndex].cards.splice(index, 1);
      // const task = draft[listIndex].cards[index];

      // draft[listIndex].cards.push(item);
    }))
    // console.log(lists[listIndex].cards[index])
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { id, index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) { return }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return
      }


      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);



      item.index = targetIndex;
      item.listIndex = targetListIndex;

    }
  })

  dragRef(dropRef(ref))

  return (
    <>
      <div className={isDragging ? 'card cardDragging' : 'card'} ref={ref} onClick={handleOpenModalInCard}>
        <p><strong>{title}</strong></p>
        <p>{content}</p>
      </div>

      <div className="containerModalCard">
        <Modal
          className={classes.modal}
          open={openModal}
          onClose={handleCloseModalInCard}
        >
          <div className={classes.paper}>
            <div className="modalContent">
              <div className="buttonDeleteTaskContainer">
                <Button color="secondary" onClick={handleOpenDeleteModal}>
                  <DeleteIcon />
                </Button>

                <Modal
                  className={classes.modal}
                  open={openDeleteModal}
                  onClose={handleCloseDeleteModal}
                >
                  <div className={classes.paper}>
                    <div className="deleteTaskContent">
                      <p>Tem certeza que deseja deletar esta tarefa?</p>
                      <div className="buttonsDeleteTask">
                        <Button variant="contained" onClick={handleCloseDeleteModal}>
                          Cancelar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleDeleteTask}>
                          Deletar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
              <h3>{title}</h3>
              <div className="description">
                <h5>Descrição</h5>
                {content}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}