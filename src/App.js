import React,{useState,useEffect} from 'react';
import './App.scss';
import Colors_Array from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {

const [quote, setQuote] = useState("I didn’t fail the test. I just found 100 ways to do it wrong.");

const [author, setAuthor] =useState("Benjamin Franklin");



const [randomNumber,setRandomNumber] = useState(0);
const [quotesArray,setQuotesArray] = useState(null);
const [accentColor, setAccentColor] = useState('#282c34')


const fetchQuotes = async (url)=>{
  const responce = await fetch(url) 
  const parsedJson = await responce.json()
  setQuotesArray(parsedJson.quotes)
}


useEffect(()=>{
  fetchQuotes(quoteDBUrl)
},[quoteDBUrl])


const generateRandomQuote=()=>{
  let randomInteger = Math.floor(Math.random() *quotesArray.length)
  setRandomNumber(randomInteger);
  setAccentColor(Colors_Array[randomInteger]);
  setQuote(quotesArray[randomInteger].quote);
  setAuthor(quotesArray[randomInteger].author);

  
}



  return (
    <div className="App" >
      <header className="App-header" style={{backgroundColor:accentColor}}>
        <div id="quote-box" style={{ color:accentColor}}>
        {/* <h1>random number: {randomNumber}</h1> */}
        
        <p id="text" >
          "{quote}"
        </p>

        <p id="author" >
          - {author}
        </p>
       <div className='buttons'>
        <a id="tweet-quote" style={{color:accentColor}}
        href={encodeURI("http://www.twitter.com/intent/tweet?text=${quote} -${author}")} ><FontAwesomeIcon icon={faTwitter} /></a>


        <button  style={{backgroundColor:accentColor}}id="new-quote" onClick={()=>{generateRandomQuote()}}>New Quote</button>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
