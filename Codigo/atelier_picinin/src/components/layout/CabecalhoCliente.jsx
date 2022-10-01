import './css/CabecalhoCliente.css'

import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const CabecalhoCliente = () => {
    function handlePageLocation(e) {
        const allLinkMenu = document.querySelectorAll(".menu a");
        allLinkMenu.forEach(menuLink => menuLink.classList.remove("active"));

        const element = e.target;
        element.classList.add("active");
    }

    return (
        <nav className="div-header">
            <div className="logo-menu">
                <h1 className="logo">Logo</h1>
                <div className="menu">
                    <Link id="home" to="/" onClick={ handlePageLocation }>Home</Link>
                    <Link id="contatos" to="/" onClick={ handlePageLocation }>Contatos</Link>
                </div>
            </div>
            <div className="buttons">
                <Link to="/carrinho" className="carrinho"><AiOutlineShoppingCart /></Link>
                <Link to="/" className="perfil"><BiUser /></Link>
            </div>
        </nav>
    )
}

export default CabecalhoCliente