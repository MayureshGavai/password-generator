import React from 'react'
import {useState, useCallback, useEffect, useRef} from 'react'
import { FiRefreshCcw, FiCopy } from "react-icons/fi";


const App = () => {

  const [length, setlength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState('')


  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    () => {
      let pass = ''
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      if(numAllowed) str += '0123456789'
      if(charAllowed) str += '!@#$%^&*-_+=[]{}~`'

      for(let i=0;i<length;i++){
        let char = Math.floor(Math.random()*str.length+1)
        pass += str.charAt(char)
      }

      setpassword(pass)

    },
    [length, numAllowed, charAllowed, setpassword],
  )

  const copytoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(() => {
    
    passwordGenerator()
  
  }, [length, numAllowed, charAllowed, passwordGenerator])
  



  return (
    <div className='m-14 p-5 w-100 bg-black rounded-lg text-white'>
      <h1 className='mt-5 text-4xl text-center font-medium font-mono'>Password Generator🔑</h1>
      <div className='flex m-10 justify-center'>
          <input className='p-2 w-96 text-2xl font-mono rounded-md text-black' type="text" value={password} ref={passwordRef} readOnly/>
          <button className='mx-3 px-3 bg-emerald-600 text-2xl font-mono rounded-md border-b-4 border-emerald-800' onClick={passwordGenerator}><FiRefreshCcw />
</button>
          <button className='px-3 bg-emerald-600 text-2xl font-mono rounded-md border-b-4 border-emerald-800' onClick={copytoClipboard}><FiCopy/></button>

      </div>
      <div className='mt-6 flex items-center justify-center max-sm:flex-col'>
        <input type="range" className='cursor-pointer' min={8} max={30} value={length} onChange={e=>setlength(e.target.value)}/>
        <label className='mx-4 text-lg font-mono ' htmlFor="">Length : {length}</label>
        <input type="checkbox" className='ml-5 cursor-pointer' defaultChecked={numAllowed} onChange={()=>setnumAllowed(prev => !prev)}/>
        <label className='mx-2 text-lg font-mono ' htmlFor="">Numbers</label>
        <input type="checkbox" className='ml-5 cursor-pointer' defaultChecked={charAllowed} onChange={()=>setcharAllowed(prev => !prev)}/>
        <label className='mx-2 text-lg font-mono ' htmlFor="">Special Characters</label>
      </div>
    </div>
  )
}

export default App
