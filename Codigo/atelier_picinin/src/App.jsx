import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

import Rodape from './components/layout/Rodape'
import Home from './pages/jsx/Home'
import CadastrarProduto from './pages/jsx/CadastrarProduto'
import Estoque from './pages/jsx/Estoque'
import CadastrarInsumo from './pages/jsx/CadastrarInsumo'
import EditInventory from './pages/jsx/EditInventory'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={ <Home /> }>Home</Route>
        <Route path='/cadastrarProduto' element={ <CadastrarProduto /> }>Cadastrar Produtos</Route>
        <Route path='/estoque' element={ <Estoque /> }>Estoque</Route>
        <Route path='/cadastrarInsumo' element={ <CadastrarInsumo /> }></Route>
        <Route path='/estoque/:id' element={ <EditInventory /> }></Route>
      </Routes>
      <Outlet/>
      <Rodape />
    </div>
  )
}

export default App
