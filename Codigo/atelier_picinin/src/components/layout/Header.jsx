import './css/Header.css'

import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Header = ({ state }) => {
    function handlePageLocation(e) {
        const allLinkMenu = document.querySelectorAll(".menu a")
        allLinkMenu.forEach(menuLink => menuLink.classList.remove("active"))

        const element = e.target
        element.classList.add("active")
    }

    return (
        <nav className="div-header">
            <div className="logo-menu">
                <h1 className="logo">Logo</h1>
                <div className="menu">
                    <Link id="home" to="/" onClick={ handlePageLocation }>Home</Link>
                    { state ? <>
                            <Link id="cadastrarProduto" to="/cadastrarProduto" onClick={ handlePageLocation }>Cadastrar Produtos</Link>
                            <Link id="estoque" to="/estoque" onClick={ handlePageLocation }>Estoque</Link>
                        </> : <>
                            <Link id="contatos" to="/" onClick={ handlePageLocation }>Contatos</Link>
                        </>
                    }
                </div>
            </div>
            <div className="buttons">
                { !state && <Link to="/carrinho" className="carrinho"><AiOutlineShoppingCart /></Link> }
                <Link to="/" className="perfil"><BiUser /></Link>
            </div>
        </nav>
    )
}

export default Header