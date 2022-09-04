import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import Rodape from './components/Rodape'
import Cabecalho from './components/Cabecalho'

function App() {
  const [teste, setTest] = useState([]);

  fetch("http://localhost:3000/", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((resp) => resp.json())
  .then((data) => { setTest(data) })
  .catch((err)=> console.log(err))


  return (
    <div className="App">
      <Cabecalho/>
      <Outlet/>
      <p>{teste.message}</p>
      <Rodape />
    </div>
  )
}

export default App
