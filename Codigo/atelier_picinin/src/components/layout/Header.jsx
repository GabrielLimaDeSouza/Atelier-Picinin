import './css/Header.css'

import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header = ({ state, logged }) => {

    function handlePageLocation(e) {
        const allLinkMenu = document.querySelectorAll(".menu a")
        allLinkMenu.forEach(menuLink => menuLink.classList.remove("active"))

        const element = e.target
        element.classList.add("active")
    }

    const loggedUser = state ?
        <>
            <Link id="cadastrarProduto" to="/cadastrarProduto" onClick={handlePageLocation}>Cadastrar Produtos</Link>
            <Link id="estoque" to="/estoque" onClick={handlePageLocation}>Estoque</Link>
        </> : <>
            <Link id="contatos" to="/" onClick={handlePageLocation}>Contatos</Link>
        </>

    const unloggedUser = <>
        <Link id="cadastrar" to="/cadastrar" onClick={handlePageLocation}>Cadastrar</Link>
        <Link id="login" to="/login" onClick={handlePageLocation}>Login</Link>
    </>

    return (
        <div className="header">
            <nav className="div-header">
                <div className="logo-menu">
                    <Link id="home" to="/"><img src="../../../public/logo_atelier.png" alt="Logo" className="logo" /></Link>
                    <div className="menu">
                        <Link id="home" to="/" onClick={handlePageLocation}>Home</Link>
                        {logged && loggedUser}
                    </div>
                </div>
                <div className="buttons">
                    {!logged ? unloggedUser :
                        <>
                            {!state && <Link to="/carrinho" className="carrinho"><AiOutlineShoppingCart /></Link>}
                            <Link to="/"><BiUser className="perfil" /></Link>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Header