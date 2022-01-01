import { useContext, useMemo, useState } from 'react';
import { CharacterContext } from '../providers/CharacterProvider';
import Card from '../components/Card';
import Input from '../components/Input';

function MainPage() {
  const characterContext = useContext(CharacterContext);
  const [ filter, setFilter ] = useState('');

  const ToDisplayCharacters = useMemo(() => {
    if(!filter.length)
      return characterContext;
    return characterContext.filter(x=> x.name && x.name.trim().toLowerCase().includes(filter) );
  },[filter])

  return (
    <div className='container'>
      <div>
        <Input 
          onChange={(val) => setFilter(val) }
          withClear={true}  
          placeholder={'Filter Character...'}
        />
      </div>
      <div className='flex-container' 
        style={{
          justifyContent:'space-between',
          padding:'0 16px',
          marginTop: 32
      
        }}>
        {ToDisplayCharacters.length ? ToDisplayCharacters.map( c => (
          <div key={c.id} className='col-lg-2_5' style={{marginBottom: 32}}>
            <Card 
              id={c.id}
              character={c}
            />
          </div>
        ) ) : <h1> אין תוצאות </h1>}
      </div>
    </div>
  )
}

export default MainPage;