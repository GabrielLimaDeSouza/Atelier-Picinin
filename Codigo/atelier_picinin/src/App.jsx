import { Link, Outlet } from 'react-router-dom'
import './App.css'

import Rodape from './components/Rodape'
import Cabecalho from './components/Cabecalho'

function App() {

  return (
    <div className="App">
      <Cabecalho/>
      <Rodape />
      <Outlet/>
    </div>
  )
}

export default App
