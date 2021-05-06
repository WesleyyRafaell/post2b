import './style.css';

export default function Card({content}) {
  return(
    <div className="card">
      <p><strong>Projeto 1</strong></p>
      <p>{content}</p>
    </div>
  )
}