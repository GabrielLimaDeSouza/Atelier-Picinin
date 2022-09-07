import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import Rodape from './components/Rodape'
import Cabecalho from './components/Cabecalho'
import CadastrarProduto from './pages/jsx/CadastrarProduto'
import Home from './pages/jsx/Home'
import Estoque from './pages/jsx/CadastrarInsumo'
import EditInventory from './pages/jsx/EditInventory'

function App() {
  return (
    <div className="App">
      <Cabecalho/>
      <Routes>
        <Route exact path='/' element={ <Home /> }>Home</Route>
        <Route path='/cadastrarProduto' element={ <CadastrarProduto /> }>Cadastrar Produtos</Route>
        <Route path='/estoque' element={ <Estoque /> }>Estoque</Route>
        <Route path='/estoque/:id' element={ <EditInventory /> }></Route>
      </Routes>
      <Outlet/>
      <Rodape />
    </div>
  )
}

export default App
