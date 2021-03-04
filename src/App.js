import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
function encode(s) {return btoa(s);}
function decode(s) {return atob(s)};

function App() {

  const conststyle = {
    width: "100vw",
    height: "100vh",
    margin: "0px",
    padding: "0px",
    fontSize: "2rem",
  }

  function keyUp(e) {
    e = e.target
    console.log(e.value);
    window.location.href = `${window.location.href.split("#")[0]}#${btoa(e.value)}`;
    (() => {
      const invert_length = 600;
      if (document.querySelector('textarea').value.length > invert_length) {
        console.log(document.querySelector('textarea').value.length)
        document.querySelector('textarea').style.color = "white";
        document.querySelector('textarea').style.backgroundColor = "black";
      } else {
        document.querySelector('textarea').style.color = "black";
        document.querySelector('textarea').style.backgroundColor = "white";
      }
    })();

    window.addEventListener('load', () => {
      document.querySelector('textarea').value = decode(window.location.href.split("#")[1]);
    });

  }

  return (<textarea onkeyup="myFunction(this)" onKeyUp={keyUp} style={conststyle}></textarea>);

}

export default App;
