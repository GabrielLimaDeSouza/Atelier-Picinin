import './css/CabecalhoAdmin.css'

import { Link } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'

const CabecalhoAdmin = () => {
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
                    <Link id="cadastrarProduto" to="/cadastrarProduto" onClick={ handlePageLocation }>Cadastrar Produtos</Link>
                    <Link id="estoque" to="/estoque" onClick={ handlePageLocation }>Estoque</Link>
                </div>
            </div>
            <Link to="/"><BiUser /></Link>
        </nav>
    )
}

export default CabecalhoAdmin