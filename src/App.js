import './App.css';
import React, { useState } from 'react';
import Papa from 'papaparse'
import Loading from './components/Loading'

function App() {

  const [wordsJSON, setWordsJSON] = useState("");

  const read_data = localStorage.getItem("words");
  if(read_data){
    console.log("READ DATA")
    console.log(read_data)
  }else{
    fetch('https://docs.google.com/spreadsheets/d/1eXIWcvWmPaMkTYBByzaoEuq-NgAuwXTkXDgL_OV937Y/export?gid=0&format=csv')
    .then((response) => response.text())
    .then((csv) => {
      // csv is .csv string
      //console.log(data)
      var data = Papa.parse(csv).data;
      data.shift()
      //console.log(data)

      let words = [] // long list of 2-element lists, where [0]th is english and [1]th element is polish
      data.forEach(function (item, index) {
        let word = [item[0], item[1]]
        words.push(word)
      })
      localStorage.setItem("words", JSON.stringify(words));
      setWordsJSON(words)
    });
  }


  return (
    <div className="App">
      <Loading/>
    </div>
  );
}

export default App;