import { useState, useCallback,useEffect, useRef } from 'react'
import './App.css'
import Card from './components/Card2'

function App() {
  const [length, setlen] = useState(8)
  const [numallowed, setnumallowed] = useState(false)
  const [charallowed, setchar] = useState(false)
  const [password, setpassword] = useState("")

const passref=useRef(null)

  const passgen = useCallback(() => {
    let pass = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numallowed) string += "0123456789"
    if (charallowed) string += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      // console.log(char);
      pass += string.charAt(char)
    }


    setpassword(pass)





  }, [length, numallowed, charallowed,setpassword ])


useEffect(()=>{
  passgen()
},[length,numallowed,charallowed,passgen])

const passcopyclipboard = useCallback(()=>{
passref.current?.select()
window.navigator.clipboard.writeText(password)
})

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-4 my-9 py-10 text-orange-400 bg-gray-700">
        <h1 className='text-white text-center my-4 text-2xl'> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          <input type="text"

            value={password}
            className='outline-none w-full text-left p-3'
            placeholder='Password'
            readOnly
            ref={passref}
          />
          <button onClick={passcopyclipboard} className='bg-blue-800 text-white px-5  shrink-0'>Copy</button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range" min={6} max={100} value={length}
              className='cursor-pointer'
              onChange={(e) => { setlen(e.target.value) }}
            />
            <label >Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultValue={numallowed}
              id="numberInput"
              onChange={() => {
                setnumallowed((prev) => !prev
                )
              }}

            />
            <label htmlFor="numberInput">Numbers</label>

          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultValue={charallowed}
              id="charInput"
              onChange={() => {
                setchar((prev) => !prev)
              }}

            />
            <label htmlFor="charInput">Characters</label>

          </div>


        </div>




      </div>










    </>
  )
}

export default App
