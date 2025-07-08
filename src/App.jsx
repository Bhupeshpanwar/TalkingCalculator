import { useState, useEffect } from "react";
import "./App.css";
import { evaluate, i } from "mathjs";
import soundnumbers from "./dict";



export default function App() {
  const [value, setvalue] = useState('0');
  const[evaluate1,setevaluate]= useState(false)
  


  const Handler = (num) => {
    if(evaluate1===true || value==='0'){
      setvalue(String(num))
      setevaluate(false)
      player(num)
      

    }
    else{
    setvalue(value+String(num));}
    player(num)
  };

  const Equal = () =>{
   try{const Result = evaluate(value.replace('**','^'))
   setvalue(String(Result))
   setevaluate(true)
   Equalaudio(Result)
   }
   catch(err){
    setvalue("Error")
   }
  }
  const Escape=()=>{
    setvalue('0')
    player("clear")
  }
  const backspace=()=>{
    if (value==='0'|| value.length===1){
      setvalue('0')
      player("Backspace")
    }
    else{
    setvalue(value.slice(0,-1))}
    player("Backspace")
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','='];
      if (allowedKeys.includes(event.key)) {
       Handler(event.key)
        }
        else if(event.key==="Enter"){
          Equal()
        }
        else if(event.key==="Backspace"){
          backspace()
        }
        else if (event.key==="Escape"){
          Escape()
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [value,evaluate1]);
  
 const player = (x) => {
 
   const filename = soundnumbers[String(x)];
  const audio = new Audio(filename);
  audio.play(); 
 
  
};
const Equalaudio = (string) => {
  const audio = String(string);
  const aarray = audio.split("");

  player("Equals"); // Play the Equals sound first

  // Wait 500ms before starting the rest
  setTimeout(() => {
    for (let i = 0; i < aarray.length; i++) {
      setTimeout(() => {
        player(aarray[i]);
      }, i * 500); // stagger the rest of the characters
    }
  }, 500); // delay start of character sounds
};
  

  return (
    <div className="box">
      <div className="brand">CASIO</div>
      <div className="val">{value}</div>
      <div className="buttongroup">
        <button className="b" onClick={() => Handler(7)}>7</button>
        <button className="b" onClick={() => Handler(8)}>8</button>
        <button className="b" onClick={() => Handler(9)}>9</button>
        <button className="b" onClick={() => Handler("/")}>÷</button><br />
        <button className="b" onClick={() => Handler(4)}>4</button>
        <button className="b" onClick={() => Handler(5)}>5</button>
        <button className="b" onClick={() => Handler(6)}>6</button>
        <button className="b" onClick={() => Handler("-")}>-</button><br />
        <button className="b" onClick={() => Handler(1)}>1</button>
        <button className="b" onClick={() => Handler(2)}>2</button>
        <button className="b" onClick={() => Handler(3)}>3</button>
        <button className="b" onClick={() => Handler("*")}>×</button><br />
        <button className="b" onClick={() => Handler(0)}>0</button>
        <button className="b" onClick={() => Handler("+")}>+</button>
        <button className="b" onClick={() => Handler(".")}>.</button>
        <button className="b" onClick={() => Equal()}>=</button>
<button className="b-wide" onClick={() => Escape()}>C</button>
<button className="b-wide" onClick={() => backspace()}>&#9003;</button>
      </div>
    </div>
  );
}
