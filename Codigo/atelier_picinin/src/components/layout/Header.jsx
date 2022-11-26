import './css/Header.css'

import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import logo from '../../../public/logo_atelier.png'

const Header = ({ isAdmin, logged, handleLogout }) => {

    function handlePageLocation(e) {
        const allLinkMenu = document.querySelectorAll(".menu a")
        allLinkMenu.forEach(menuLink => menuLink.classList.remove("active"))

        const element = e.target
        element.classList.add("active")
    }

    const loggedUser = isAdmin ?
        <>
            <Link id="cadastrarProduto" to="/adm/cadastrarProduto" onClick={handlePageLocation}>Cadastrar Produtos</Link>
            <Link id="estoque" to="/adm/estoque" onClick={handlePageLocation}>Estoque</Link>
            <Link id="pedidos" to="/adm/pedidos" onClick={handlePageLocation}>Pedidos</Link>
        </> : <>
            <Link id="contatos" to="/" onClick={handlePageLocation} className="contatos">Contatos</Link>
        </>

    const unloggedUser = <>
        <Link id="cadastrar" to="/cadastrar" onClick={handlePageLocation} className="cadastrarUnlogged">Cadastrar</Link>
        <Link id="login" to="/login" onClick={handlePageLocation} className="loginUnlogged">Login</Link>
    </>

    return (
        <div className="header">
            <nav className="div-header">
                <div className="logo-menu">
                    <Link id="home" to="/"><img src={logo} alt="Logo" className="logo" /></Link>
                    <div className="menu">
                        <Link id="home" to="/" onClick={handlePageLocation} className="home">Home</Link>
                        {logged && loggedUser}
                    </div>
                </div>
                <div className="buttons">
                    {!logged ? unloggedUser :
                        <>
                            {!isAdmin && <>
                                <Link to="/carrinho" className="carrinho"><AiOutlineShoppingCart /></Link>
                                <Link to="/perfilUsuario"><BiUser className="perfil" /></Link>
                            </> }
                            <span className="logout" onClick={handleLogout}>Logout</span>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Header