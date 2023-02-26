import './App.css';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'
import Loading from './components/Loading'
import Card from './components/Card'



function App() {

  const [wordsJSON, setWordsJSON] = useState("");
  const [randomWord, setRandomWord] = useState();
  
  function getData(reset){
    const read_data = localStorage.getItem("words");
    if(read_data && reset == false){
      console.log("READ DATA")
      console.log(JSON.parse(read_data))
      setWordsJSON(JSON.parse(read_data))
    }else{
      console.log("requesting new data")
      fetch('https://docs.google.com/spreadsheets/d/1eXIWcvWmPaMkTYBByzaoEuq-NgAuwXTkXDgL_OV937Y/export?gid=0&format=csv')
      .then((response) => response.text())
      .then((csv) => {
        // csv is .csv string
        var data = Papa.parse(csv).data; // parsing csv to json, which is list of lists representing each row
        data.shift() // removing header
  
        let words = [] // long list of 2-element lists, where [0]th is english and [1]th element is polish
        data.forEach(function (item, index) {
          let word = [item[0], item[1]]
          words.push(word)
        })
        localStorage.setItem("words", JSON.stringify(words));
        setWordsJSON(words)
        console.log(words)
      });
    }
  }

  function pickRandomWord(reset){
    if(wordsJSON && (!randomWord || reset===true)){
      const pickedWord = wordsJSON[Math.floor(Math.random()*wordsJSON.length)];
      console.log(pickedWord)
      console.log("PICKED RANDOMM WORLDD")
      setRandomWord(pickedWord)
    }
  }

  useEffect(() => {
    console.log(wordsJSON)
    if(!wordsJSON){
      getData(false)
    }
  }, []);
  pickRandomWord()

  let website;
  if (randomWord){
    website = (
      <div>
        <Card word={randomWord} pickRandomWord={pickRandomWord} />
        <button className='reset_button' onClick={() => getData(true)}> reset cache </button>
      </div>
    )
  }else{
    website = <Loading/>
  }

  return (
    <div className="App">
      {website}   
    </div>
  );
}

export default App;