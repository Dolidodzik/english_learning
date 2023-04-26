import './App.css';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'
import Loading from './components/Loading'
import Card from './components/Card'



function App() {

  const [wordsJSON, setWordsJSON] = useState("");
  const [randomWord, setRandomWord] = useState();
  const [type, setType] = useState("WORDS_1_TYPE"); // used for telling which columns to use as an input

  
  function getData(reset, new_type=""){
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
        
        if(!new_type){
          new_type = type
        }

        let a, b, c;
        if(new_type == "WORDS_1_TYPE"){
          a = 0;
          b = 1;
          c = 2;
        }else if(new_type == "IDIOMS_1_TYPE"){
          a = 4;
          b = 5;
        }

        let words = [] // long list of 2(or3)-element lists, where [0]th is english and [1]th element is polish, 3rd element is example usage of given word and it's optional field
        data.forEach(function (item, index) {
          if(item[a] && item[b]){
            let word = [item[a], item[b], item[c]]
            words.push(word)
          }
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

  function switchType(new_type){
    setType(new_type)
    getData(true, new_type)
  }

  let website;
  if (randomWord){
    website = (
      <div>
        <Card word={randomWord} pickRandomWord={pickRandomWord} />
        <button className='reset_button' onClick={() => getData(true)}> reset cache </button>
        <button className='words_button1' onClick={() => switchType("WORDS_1_TYPE")}> words 1 </button>
        <button className='idioms_button1' onClick={() => switchType("IDIOMS_1_TYPE")}> idioms 1 </button>
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