import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './pages/jsx/Home'
import CadastrarProduto from './pages/jsx/CadastrarProduto'
import Estoque from './pages/jsx/Estoque'
import CadastrarInsumo from './pages/jsx/CadastrarInsumo'
import EditInventory from './pages/jsx/EditInventory'
import DetalhesProduto from './pages/jsx/DetalhesProduto'
import Carrinho from './pages/jsx/cart/Carrinho'
import AdicionarEndereco from './pages/jsx/cart/AdicionarEndereco'
import Cabecalho from './components/layout/Header'
import MenuMobile from './components/layout/MenuMobile'
import Login from './pages/jsx/Login'
import CadastarUsuario from './pages/jsx/CadastrarUsuario'
import CadastarUsuarioAdm from './pages/jsx/CadastrarUsuarioAdm'
import { useEffect, useState } from 'react'

const url = "http://localhost:3000"

function App() {
  const [id, setId] = useState(getCookie("_id") || null)
  const [isLogged, setIsLogged] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [user, setUser] = useState({})
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (id) {
      fetch(`${url}/api/user/getUserById?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
        .then(data => setUser(data))
        .catch(err => console.error(err))

      setIsLogged(true)
    }
  }, [id])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    document.body.style.overflowY = menuVisible ? 'hidden' : 'auto'
  }, [menuVisible])

  function getCookie(name) {
    let cookie = {}

    document.cookie.split(';').forEach((el) => {
      let [k, v] = el.split('=')
      cookie[k.trim()] = v
    })

    return cookie[name]
  }

  function handleLogged(login) {
    setId(login._id)
    setIsLogged(login.isLogged)
  }

  return (
      <div className="App">
        { windowWidth <= 900 ?
          <MenuMobile state={ user.admin } menuVisible={ menuVisible } setMenuVisible={ setMenuVisible } logged={ isLogged }/>
          :
          <Cabecalho state={ user.admin } logged={ isLogged }/>
        }
        
        <Routes>
          <Route exact path='/' element={ <Home /> }>Home</Route>
          <Route path='/cadastrarProduto' element={ <CadastrarProduto /> }>Cadastrar Produtos</Route>
          <Route path='/estoque' element={ <Estoque /> }>Estoque</Route>
          <Route path='/cadastrarInsumo' element={ <CadastrarInsumo /> }></Route>
          <Route path='/estoque/:id' element={ <EditInventory /> }></Route>
          <Route path='/detalhesProduto/:id' element={ <DetalhesProduto /> }></Route>
          <Route path='/carrinho' element={ <Carrinho /> }></Route>
          <Route path='/adicionarEndereco' element={ <AdicionarEndereco /> }></Route>
          <Route path='/login' element={ <Login isLogged={ handleLogged }/> }></Route>
          <Route path='/cadastrar' element={ <CadastarUsuario /> }></Route>
          <Route path='/cadastrarAdm' element={ <CadastarUsuarioAdm /> }></Route>
        </Routes>
        <Outlet/>

        <Rodape/>
      </div>
  )
}

export default App
