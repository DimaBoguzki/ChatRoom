import React from 'react';

export default function Input({ value, placeholder, onChange, withClear }){
  const [ val, setVal ] = React.useState('');

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(val)
    }, 100)
    return () => clearTimeout(delayDebounceFn)
  }, [ val ])
  
  React.useEffect(() => {
    if(value && value==='-1'){
      setVal('')
    }
  }, [ value ])
  return (
    <div className="app-input">
      {withClear ? <div style={{width:30}}>
        {val.length ? 
          <button 
            style={{fontSize:18}}
            onClick={()=>setVal('')}
          >
          {'X'}
          </button> : null}
      </div> : null}
      <input 
        placeholder={placeholder ? placeholder : 'search'}
        onChange={ (e) => setVal(e.target.value) }
        value={val}
      />
    </div>
  )
}