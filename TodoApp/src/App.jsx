import { useState } from 'react'
import './App.css'
import Home from "./Home" 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='home'>
      <Home />
    </div>
      
    </>
  )
}

export default App
