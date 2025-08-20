import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCounter] = useState(10);
  const heading = document.getElementById('heading');
  const addValue = () => {
     if(counter <10){
       counter +=1;
       setCounter(counter);
      }
      else{
        counter +=1;
       setCounter(counter);
        const newPara = document.createElement('p');
        newPara.id = `cDisplay`;
        newPara.innerHTML=`counter have turn more than  ${counter}`;
        heading.appendChild(newPara);
        console.log(`counter have become negative: ${counter}`);
        
      }
   
  };
  const decreaseValue = () => {
    if(counter >0){
      counter -=1;
      setCounter(counter);
    }
    else{
       counter -=1;
      setCounter(counter);
      const newPara = document.createElement('p');
      newPara.id = `cDisplay`;
      newPara.innerHTML=`counter have turn negative ${counter}`;
      heading.appendChild(newPara);
      console.log(`counter have become negative: ${counter}`);
    }
  };
  return (
    <>
    <h1 id='heading'>Chai aur React</h1>
    <h2>Counter value: {counter}</h2>


    <button onClick={addValue}>Add value {counter}</button>

    <br /><br />

    <button onClick={decreaseValue}>Decrease value {counter}</button>
    </>
  )
}

export default App
