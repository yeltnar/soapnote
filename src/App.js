import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function encode(s) {
  s = encodeURIComponent(s);
  return s;
}
function decode(s) {
  s = (decodeURIComponent(s));
  return s;
}

window.addEventListener('load', () => {
  const url = window.location.href.split("#")[1]||"";
  console.log(window.location.href);
  console.log(url);
  console.log(decode(url));
  document.querySelector('textarea').value = decode(url);
  fixColors();
});

function App() {

  function keyUp(e) {
    e = e.target
    // console.log(e.value);
    window.location.href = `${window.location.href.split("#")[0]}#${encode(e.value)}`;
    fixColors();
    // console.log(decode(e.value))
  }

  return (<textarea onKeyUp={(e)=>{keyUp(e);}} className="maintextarea"></textarea>);

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