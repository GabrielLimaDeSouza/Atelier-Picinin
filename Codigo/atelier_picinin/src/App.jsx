import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

import Rodape from './components/layout/Rodape'
import Home from './pages/jsx/Home'
import CadastrarProduto from './pages/jsx/CadastrarProduto'
import Estoque from './pages/jsx/Estoque'
import CadastrarInsumo from './pages/jsx/CadastrarInsumo'
import EditInventory from './pages/jsx/EditInventory'
import DetalhesProduto from './pages/jsx/DetalhesProduto'
import Carrinho from './pages/jsx/cart/Carrinho'
import AdicionarEndereco from './pages/jsx/cart/AdicionarEndereco'
import CabecalhoAdmin from './components/layout/CabecalhoAdmin'
import CabecalhoCliente from './components/layout/CabecalhoCliente'
import { useEffect, useState } from 'react'

const url = "http://localhost:3000"

function App() {
  const [user, setUser] = useState({})
  const idAdmin = "6338b9c1c5008fbce42bed33"
  const idClient = "63322d88207cc8eeb929f645"

  useEffect(() => {
    fetch(`${url}/api/user/getUserById?id=${idAdmin}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(resp => resp.json())
  .then(data => setUser(data))
  .catch(err => console.error(err))
  }, [])
  
  return (
    <div className="App">
      { user.admin ? <CabecalhoAdmin /> : <CabecalhoCliente /> }
      
      <Routes>
        <Route exact path='/' element={ <Home /> }>Home</Route>
        <Route path='/cadastrarProduto' element={ <CadastrarProduto /> }>Cadastrar Produtos</Route>
        <Route path='/estoque' element={ <Estoque /> }>Estoque</Route>
        <Route path='/cadastrarInsumo' element={ <CadastrarInsumo /> }></Route>
        <Route path='/estoque/:id' element={ <EditInventory /> }></Route>
        <Route path='/detalhesProduto/:id' element={ <DetalhesProduto /> }></Route>
        <Route path='/carrinho' element={ <Carrinho /> }></Route>
        <Route path='/adicionarEndereco' element={ <AdicionarEndereco /> }></Route>
      </Routes>
      <Outlet/>
      <Rodape />
    </div>
  )
}

export default App
