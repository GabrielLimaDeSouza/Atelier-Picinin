import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="App">
      <nav id="navBar">
        <Link to={"/"}>Home</Link>
        <Link to={"/cadastrarProduto"}>CadastrarProduto</Link>
      </nav>
      
      <Outlet/>
    </div>
  )
}

export default App
