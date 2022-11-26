import './css/MenuMobile.css'

import { IoClose } from 'react-icons/io5'
import { RiMenu3Fill } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

const MenuMobile = ({ state, menuVisible, setMenuVisible, logged, handleLogout }) => {
    const navigate = useNavigate()

    function handleVisibilityMenu() {
        const nav = document.querySelector("nav.menu")
        nav.classList.toggle("active")

        const divVisible = document.querySelector("div.visibleMenu")
        divVisible.classList.toggle("visible")

        setTimeout(() => setMenuVisible(!menuVisible), 100)
    }

    const loggedUser = <>
        { state ?
            <>
                <Link id="cadastrarProduto" to="/adm/cadastrarProduto" onClick={handleVisibilityMenu}>Cadastrar Produtos</Link>
                <Link id="estoque" to="/adm/estoque" onClick={handleVisibilityMenu}>Estoque</Link>
                <Link id="pedidos" to="/adm/pedidos" onClick={handleVisibilityMenu}>Pedidos</Link>
            </> : <>
                <Link id="contatos" to="/" onClick={handleVisibilityMenu}>Contatos</Link>
            </>
        }
        <span className="logout" onClick={ handleLogout }>Logout</span>
    </>

    const unloggedUser = <>
        <Link id="cadastrar" to="/cadastrar" onClick={handleVisibilityMenu}>Cadastrar</Link>
        <Link id="login" to="/login" onClick={handleVisibilityMenu}>Login</Link>
    </>

    return (
        <div className="header">
            <nav className="menu">
                <Link id="home" to="/"><img src="../../../public/logo_atelier.png" alt="Logo" className="logo" /></Link>

                <div className="buttons">
                    {!state && <Link to="/carrinho" className="carrinho"><AiOutlineShoppingCart /></Link>}
                    <Link to="/" className="perfil"><BiUser /></Link>
                    <RiMenu3Fill onClick={handleVisibilityMenu} />
                </div>

                <div className="visibleMenu">
                    <IoClose onClick={handleVisibilityMenu} className="close" />
                    <Link id="home" to="/" onClick={handleVisibilityMenu}>Home</Link>

                    {logged ? loggedUser : unloggedUser}
                </div>
            </nav>
        </div>
    )
}

export default MenuMobile