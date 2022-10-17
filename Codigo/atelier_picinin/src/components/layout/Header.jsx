import './css/Header.css'

import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header = ({ state }) => {
    const [logged, setLogged] = useState(false)
    function handlePageLocation(e) {
        const allLinkMenu = document.querySelectorAll(".menu a")
        allLinkMenu.forEach(menuLink => menuLink.classList.remove("active"))

        const element = e.target
        element.classList.add("active")
    }

    function getCookie(name) {
        let cookie = {}
    
        document.cookie.split(';').forEach((el) => {
            let [k, v] = el.split('=')
            cookie[k.trim()] = v
        })
    
        return cookie[name]
    }

    useEffect(() => {
        const id = getCookie("_id")
        if(id) {
            setLogged(true)
        }
    }, [])

    const loggedUser = state ? 
                        <>
                            <Link id="cadastrarProduto" to="/cadastrarProduto" onClick={ handlePageLocation }>Cadastrar Produtos</Link>
                            <Link id="estoque" to="/estoque" onClick={ handlePageLocation }>Estoque</Link>
                        </> : <>
                            <Link id="contatos" to="/" onClick={ handlePageLocation }>Contatos</Link>
                        </>

    const unloggedUser = <>
                            <Link id="cadastrar" to="/cadastrar" onClick={ handlePageLocation }>Cadastrar</Link>
                            <Link id="login" to="/login" onClick={ handlePageLocation }>Login</Link>
                         </>

    return (
        <nav className="div-header">
            <div className="logo-menu">
                <h1 className="logo">Logo</h1>
                <div className="menu">
                    <Link id="home" to="/" onClick={ handlePageLocation }>Home</Link>
                    { logged ? loggedUser : unloggedUser }
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