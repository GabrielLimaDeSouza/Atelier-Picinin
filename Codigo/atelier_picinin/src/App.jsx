import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

import Home from './pages/jsx/Home'
import PerfilUsuario from './pages/jsx/PerfilUsuario'
import CadastrarProduto from './pages/jsx/CadastrarProduto'
import Estoque from './pages/jsx/Estoque'
import CadastrarInsumo from './pages/jsx/CadastrarInsumo'
import EditInventory from './pages/jsx/EditInventory'
import DetalhesProduto from './pages/jsx/DetalhesProduto'
import Carrinho from './pages/jsx/cart/Carrinho'
import AdicionarEndereco from './pages/jsx/cart/AdicionarEndereco'
import Pagamento from './pages/jsx/cart/Pagamento'
import Cabecalho from './components/layout/Header'
import MenuMobile from './components/layout/MenuMobile'
import Login from './pages/jsx/Login'
import CadastarUsuario from './pages/jsx/CadastrarUsuario'
import CadastarUsuarioAdm from './pages/jsx/CadastrarUsuarioAdm'
import Pix from './pages/jsx/cart/Pix'
import VisualizarPedidos from './pages/jsx/VisualizarPedidos'
import Rodape from './components/layout/Rodape'

import { useEffect, useState } from 'react'

const url = "http://localhost:3000"

function App() {
  const [id, setId] = useState(getCookie("_id") || null)
  const [isLogged, setIsLogged] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [user, setUser] = useState({})
  const [windowWidth, setWindowWidth] = useState(0)

  const navigate = useNavigate();

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

  const handleLogout = () => {
    var data = new Date(2010, 1, 1)
    document.cookie = '_id=; expires=' + data + '; path=/'
    setIsLogged(false)
    location.reload()
  }

  return (
    <div className="App">
      {windowWidth <= 900 ?
        <MenuMobile state={user.admin} menuVisible={menuVisible} setMenuVisible={setMenuVisible} logged={isLogged} handleLogout={handleLogout} />
        :
        <Cabecalho isAdmin={user.admin} logged={isLogged} handleLogout={handleLogout} />
      }

      <Routes>
        <Route exact path='/' element={<Home />}>Home</Route>

        <Route exact path='/adm/cadastrarProduto' element={<CadastrarProduto />}></Route>
        <Route exact path='/adm/estoque' element={<Estoque />}></Route>
        <Route exact path='/adm/cadastrarInsumo' element={<CadastrarInsumo />}></Route>
        <Route exact path='/adm/estoque/:id' element={<EditInventory />}></Route>
        <Route exact path='/adm/pedidos' element={<VisualizarPedidos />}></Route>

        <Route exact path='/detalhesProduto/:id' element={<DetalhesProduto />}></Route>
        <Route exact path='/carrinho' element={<Carrinho />}></Route>
        <Route exact path='/adicionarEndereco' element={<AdicionarEndereco />}></Route>
        <Route exact path='/perfilUsuario' element={<PerfilUsuario />}></Route>
        <Route exact path='/pagamento' element={<Pagamento />}></Route>
        <Route exact path='/pix' element={<Pix />}></Route>
        {!isLogged &&
          <>
            <Route exact path='/login' element={<Login isLogged={handleLogged} id={getCookie("_id")} />}></Route>
            <Route exact path='/cadastrar' element={<CadastarUsuario id={getCookie("_id")} />}></Route>
            <Route exact path='/adm/cadastrar' element={<CadastarUsuarioAdm id={getCookie("_id")} />}></Route>
            
          </>
        }
        <Route path='/visualizarPedidos' element={<VisualizarPedidos />}></Route>
      </Routes>

      <Outlet />
      <Rodape />
    </div>
  )
}

export default App
