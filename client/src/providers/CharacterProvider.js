import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CharacterContext = createContext();

export default function CharacterProvider({ children }){
  const [ load, setLoad ] = useState(true);
  const [ character, setCharacter ] = useState([])
  useEffect( async () =>{
    try{
      const response = await axios('/fetch');
      setCharacter(response.data)
    }
    catch(err){
      throw new Error('Feail fetxh data');
    }
    finally{
      setLoad(false);
    }
  }, [])
  return(
    <CharacterContext.Provider value={character}>
      {load ? 
        <div className="center" style={{height:'100vh'}}>
          <p>...טוען מידע</p>
        </div> : children
      }
    </CharacterContext.Provider>
  )
}