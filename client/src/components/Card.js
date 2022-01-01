import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from './Img';

function Card({ id, character }){
  const navigate = useNavigate()

  return (
    <div className="card" onClick={()=>navigate({ pathname: `/chat/${id}` }) }>
      <Img
        alt={character.name}
        src={character.image}
      />
      <div className='info'>
        <h4>{character.name}</h4>
        <h6>{character.gender}</h6>
        <p>{character.text}</p>
      </div>
    </div>
  )
}

export default memo(
  Card ,
  (prevProps, nextProps) => prevProps.id === nextProps.id
);