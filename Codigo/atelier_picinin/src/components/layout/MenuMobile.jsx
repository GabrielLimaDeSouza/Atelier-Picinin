import './css/MenuMobile.css'

import { IoClose } from 'react-icons/io5'
import { RiMenu3Fill } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const MenuMobile = ({ state, menuVisible, setMenuVisible }) => {
    function handleVisibilityMenu() {
        const nav = document.querySelector("nav.menu")
        nav.classList.toggle("active")
        
        const divVisible = document.querySelector("div.visibleMenu")
        divVisible.classList.toggle("visible")
        
        setTimeout(() => setMenuVisible(!menuVisible), 100)
    }

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
                    <Link id="home" to="/">Home</Link>
                    { state ? <>
                            <Link id="cadastrarProduto" to="/cadastrarProduto">Cadastrar Produtos</Link>
                            <Link id="estoque" to="/estoque">Estoque</Link>
                        </> : <>
                            <Link id="contatos" to="/">Contatos</Link>
                        </>
                    }
                    
                </div>
            </nav>
        </div>
    )
}

export default MenuMobile