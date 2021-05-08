import { useContext, useRef } from 'react'; 
import { useDrag, useDrop } from 'react-dnd';
import { DragContext } from '../../contexts/DragContext';

import './style.css';

export default function Card({id, index, content, listIndex}) {
  const ref = useRef();

  const { move } = useContext(DragContext)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: {id, index, listIndex},
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

      if(draggedIndex === targetIndex && draggedListIndex === targetListIndex) {return}

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if(draggedIndex < targetIndex && draggedTop  < targetCenter) {
        return
      }

      if(draggedIndex > targetIndex && draggedTop  > targetCenter) {
        return
      }


      move(draggedListIndex, targetListIndex,  draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;

    }
  })

  dragRef(dropRef(ref))

  return(
    <div className={isDragging ? 'card cardDragging' : 'card'} ref={ref}>
      <p><strong>Projeto 1</strong></p>
      <p>{content}</p>
    </div>
  ) 
}