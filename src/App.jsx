import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Calculadora } from './Calculadora'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Calculadora />
    </div>
  )
}

export default App
