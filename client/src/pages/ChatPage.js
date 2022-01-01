import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CharacterContext } from '../providers/CharacterProvider';
import Chat from '../components/Chat';
import Img from '../components/Img';

function ChatPage(){
  const characterContext = useContext(CharacterContext);
  const params = useParams();
  const { id } = params;
  
  const character=useMemo(() => {
    const x = characterContext.find( c => c.id+'' === id+'' );
    return x ? x : null
  },[ id ])
  
  if(character)
    return (
      <div className='chat-page flex-container' 
        style={{padding: '32px 128px', boxSizing:'border-box', justifyContent: 'space-between'}}>
        <div className='col-lg-12'>
          <h1>{character.name}<span>{" "}{character.gender}</span></h1>
        </div>
        <div className='col-lg-8_5' style={{position: 'relative', height:'85vh'}}>
          <Img
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className='col-lg-3'>
          <Chat
            chatId={id}
            nameChat={character.name}
          />
        </div>
      </div>
    )
  return (
    <div>
      <h1>{id}</h1>
      <h1>טוען</h1>
    </div>
  )
}

export default ChatPage;