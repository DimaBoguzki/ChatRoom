import { useRef, useState } from 'react';

function Img({src, alt}) {
  const ref = useRef(null);
  const [ load, setLoad ] = useState(true)
  const [hover, setHover ] = useState(false)

  const handleOnLoad=()=>{
    /* ###### Fake load ###### */
    const mls = Math.floor(Math.random() * (2000 - 300 + 1) + 300)
    setTimeout(()=>{
      setLoad(false)
    }, mls)
  }

  return <div style={{position:'relative'}}>
      <img
        src={src}
        alt={alt}
        ref={ref}
        onLoad={ handleOnLoad } 
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
      />
      {hover && <div className='resolution-info'>
        {alt} <br/>
        {'Resolution'} <br/>
        {`${ref.current.clientHeight}px - ${ref.current.clientWidth}px`}
      </div>}
      {load && <div className='skeleton'/> }
    </div>
}
export default Img;