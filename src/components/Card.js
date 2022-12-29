import React, { useState } from 'react';

function Card(props) {

  const [side, setSide] = useState(1);

  function switchSide(){
    if(side === 1){
        setSide(0)
    }else{
        setSide(1)
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