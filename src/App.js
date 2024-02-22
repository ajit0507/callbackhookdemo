import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {

    const [numberAllowed, setNumberAllowed] =useState(false);
    const [charAllowed, setCharAllowed] =useState(false);
    const [length, setLength] = useState(8);
    let [password, setPassword] = useState("");

    //useRef hook

     const passwordRef = useRef(null)

     const passwordGenrator = useCallback(
     ()=>{
      let pass =""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) str+="1234567890"
      if(charAllowed) str+="!@#$%^&*()_+"

      for (let index = 1; index <= length; index++) {
        let char = Math.floor(Math.random() * str.length+1);
        
        pass += str.charAt(char)

      }
      setPassword(pass)
   
     }
     ,[length,numberAllowed,charAllowed,setPassword]
     )

   useEffect(
    ()=>{passwordGenrator()},[length,numberAllowed,charAllowed,passwordGenrator]
   )


   let copyClipBoardTextValue = useCallback(
    ()=>{
       
      passwordRef.current?.select();

      window.navigator.clipboard.writeText(password)
    },
    [password]
   )

  return (
    <>
          <div className='flex-row my-4 bg-green-200'>
          
           <div className='w-96 border-x-2'>
              <input type="text"
               value={password}

               readOnly
               />
             <button type="button" 
             className="focus:outline-none text-white bg-green-700
              hover:bg-green-800 focus:ring-4 focus:ring-green-300 
              font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
               dark:bg-green-600 dark:hover:bg-green-700
                dark:focus:ring-green-800"
                 onClick={copyClipBoardTextValue}

                >Copy</button>
             
           </div>
           <div className='w-96 border-x-2'>
            <input className='bg-blue-400' 
            type="range"
             min={6}
             max={50}
             value={length}
             onChange={(e)=> {setLength(e.target.value)}}

             ref={passwordRef}
             />
            <lable>length:{length}</lable> 
            <div className='w-96 border-x-2'>
            <input className='bg-blue-400' type="checkbox"
              defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }} />
            <lable>Number Allowed</lable> 

            <input className='bg-blue-400' type="checkbox"
            defaultChecked={charAllowed}
            onChange={
              ()=>{
              setCharAllowed((prev)=>!prev)
            }
            } />
            <lable>Char Allowed</lable> 
             
           </div>  
           </div>

           
          </div>

    </>

  );
}

export default App;
