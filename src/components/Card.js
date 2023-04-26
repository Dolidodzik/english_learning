import React, { useState } from 'react';

function Card(props) {

  const [side, setSide] = useState(1);

  function switchSide(){
    if(side === 2){
      setSide(0);
    }else{
      if(props.word[2] && side === 1){ // in case "3rd side", the one containing word example usage, exists, and card is already on "1" side, we need to get to the "2" side
        setSide(2)
      }else{
        if(side === 0){
          setSide(1)
        }else if(side === 1){
          setSide(0)
        }
      }
    }
  }

  return (
    <div className="card">
        
        <h1> {props.word[side]} </h1>

        <div className='button_container'>
            <div className='div1' onClick={() => props.pickRandomWord(true)}> new word </div>
            <div className='div2' onClick={() => switchSide()}> flip the card </div>
        </div>
    </div>
  );
}

export default Card;