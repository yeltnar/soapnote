import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
function encode(s) {return btoa(s);}
function decode(s) {return atob(s);}

window.addEventListener('load', () => {
  const url = window.location.href.split("#")[1]||"";
  console.log(window.location.href);
  console.log(url);
  console.log(decode(url));
  document.querySelector('textarea').value = decode(url);
  fixColors();
});

function App() {

  const conststyle = {
    width: "100vw",
    height: "100vh",
    margin: "0px",
    padding: "0px",
    fontSize: "2rem",
    color: "white",
    backgroundColor: "black",
  }

  function keyUp(e) {
    e = e.target
    console.log(e.value);
    window.location.href = `${window.location.href.split("#")[0]}#${encode(e.value)}`;
    fixColors();
  }

  return (<textarea onKeyUp={(e)=>{keyUp(e);}} style={conststyle}></textarea>);

}

export default App;

function fixColors(){
  const invert_length = 600;
  if (document.querySelector('textarea').value.length > invert_length) {
    console.log(document.querySelector('textarea').value.length)
    document.querySelector('textarea').style.color = "#ffc6c0";
    document.querySelector('textarea').style.backgroundColor = "black";
  } else {
    document.querySelector('textarea').style.color = "white";
    document.querySelector('textarea').style.backgroundColor = "black";
  }
}