import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function encode(s) {
  s = encodeURIComponent(s);
  return s;
}
function decode(s) {
  s = (decodeURIComponent(s));
  return s;
}

const action_table = {
  g:{
    f:moveToGoogle,
    name:"moveToGoogle"
  },
  s:{
    f:moveToStartpage,
    name:"moveToStartpage"
  },
};

const getUrlValueOnLoad = (()=>{ // cache the url value on load for future calls 
  let url_value;
  return function getUrlValueOnLoad(){
    if(url_value===undefined){
      url_value = getUrlValue();
    }
    return url_value;
  }
})();

function getUrlValue(){
  return decode(window.location.href.split("#")[1]||"");
}

function App() {

  const [show_alt_menu,setShowAltMenu] = useState(false);
  const [main_text,setMainText] = useState(getUrlValueOnLoad());

  const main_text_style = (()=>{
    const invert_length = 600;
    const color = main_text.length > invert_length ? "#ffc6c0" : "white";
    return {
      backgroundColor:"black",
      color
    };
  })();

  // for hot keys
  useEffect(()=>{ 
    let last_key = undefined;
    window.addEventListener('keyup',keyupFunct);
    function keyupFunct(e){
      if( e.key==="Control" && last_key==="Control" ){
        console.log(`should open extra menu ${!show_alt_menu}`);
        setShowAltMenu(!show_alt_menu);
        focusMainTextArea();
      }
      last_key = e.key;
      setTimeout(()=>{
        last_key=undefined;
      },500);
    }
    return ()=>{
      window.removeEventListener('keyup',keyupFunct);
    };
  })

  const alt_menu = (()=>{
    if(show_alt_menu){
      return (<AltMenu></AltMenu>);
    }else{
      return null;
    }
  })();

  function mainTextChange(e){
    // debugger
    if(show_alt_menu){return;}
    setMainText(e.target.value);
    addEncodedText(e.target.value);
  }

  return (
    <>
      {alt_menu}
      <textarea value={main_text} onChange={mainTextChange} style={main_text_style} className="maintextarea"></textarea>
    </>
  );
}

export default App;

function AltMenu(){

  const style = {
    backgroundColor:"yellow",
    color:"black",
  }

  const parentStyle = {
    position:"absolute",
    left: "0px",
    top: "0px",
    width: "100%",
    zIndex: Number.MAX_SAFE_INTEGER,
    height: "10px",
  };
  const childStyle = {
    width: "100%",
    backgroundColor: style.backgroundColor,
    position: "fixed",
    left: "0px",
    top: "0px",
    color: style.color,
    textAlign: "center",
    fontSize: "2rem",
  };

  useEffect(()=>{
    window.addEventListener('keyup',keyup);
    function keyup(e){
      // debugger
      console.log(e.key);
      for(let k in action_table){
        if( k===e.key ){
          action_table[k].f();
        }
      }
      e.stopPropagation();
    }
    focusMainTextArea()
    return ()=>{window.removeEventListener('keyup',keyup)}
  });

  const content = (()=>{
    const arr = [];
    let i=0;
    for(let k in action_table){
      arr.push(<div key={i++}>{k} {action_table[k].name}</div>);
    }
    return arr;
  })();

  return (
    <div style={parentStyle}>
      <div style={childStyle}>
        {content}
      </div>
    </div>
  )
}

function focusMainTextArea(){
  window.focus(getMainTextAreaEle());
}

function getMainTextAreaEle(){
  return document.querySelector(".maintextarea");
}

function moveToGoogle(){
  // alert('google');
  const text = getMainTextAreaEle().value;
  changePage(`https://google.com/search?q=${text}`);
}

function moveToStartpage(){
  alert('sp');  
}

function changePage(url){
  window.location.href = url;
}

const addEncodedText = (()=>{
  let timeout_id;
  return function addEncodedText(raw_text){
    clearTimeout(timeout_id);
    timeout_id = setTimeout(()=>{
      const new_value = `${window.location.href.split("#")[0]}#${encode(raw_text)}`;
      window.location.href = new_value;  // this takes a while... only do it after stop updating for a sec 
    },500);
  }
})();


