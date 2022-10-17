import './css/MenuMobile.css'

import { IoClose } from 'react-icons/io5'
import { RiMenu3Fill } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const MenuMobile = ({ state, menuVisible, setMenuVisible }) => {
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate()

    function handleVisibilityMenu() {
        const nav = document.querySelector("nav.menu")
        nav.classList.toggle("active")
        
        const divVisible = document.querySelector("div.visibleMenu")
        divVisible.classList.toggle("visible")
        
        setTimeout(() => setMenuVisible(!menuVisible), 100)
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
    })

    const loggedUser = state ? 
                        <>
                            <Link id="cadastrarProduto" to="/cadastrarProduto" onClick={ handleVisibilityMenu }>Cadastrar Produtos</Link>
                            <Link id="estoque" to="/estoque" onClick={ handleVisibilityMenu }>Estoque</Link>
                        </> : <>
                            <Link id="contatos" to="/" onClick={ handleVisibilityMenu }>Contatos</Link>
                        </>

    const unloggedUser = <>
                            <Link id="cadastrar" to="/cadastrar" onClick={ handleVisibilityMenu }>Cadastrar</Link>
                            <Link id="login" to="/login" onClick={ handleVisibilityMenu }>Login</Link>
                         </>

    return (
        <div className="header">
            <nav className="menu">
            <Link id="home" to="/"><h1 className="logo">Logo</h1></Link>

                <div className="buttons">
                    { !state && <Link to="/carrinho" className="carrinho"><AiOutlineShoppingCart /></Link> }
                    <Link to="/" className="perfil"><BiUser /></Link>
                    <RiMenu3Fill onClick={ handleVisibilityMenu } />
                </div>

                <div className="visibleMenu">
                    <IoClose onClick={ handleVisibilityMenu }/>
                    <Link id="home" to="/" onClick={ handleVisibilityMenu }>Home</Link>
                    
                    { logged ? loggedUser : unloggedUser }
                </div>
            </nav>
        </div>
    )
}

export default MenuMobile