import './css/MenuMobile.css'

import { IoClose } from 'react-icons/io5'
import { RiMenu3Fill } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const MenuMobile = ({ state, menuVisible, setMenuVisible }) => {
    function handleVisibilityMenu() {
        const menu = document.querySelector(".visibleMenu")
        menu.classList.toggle("visible")
        
        setTimeout(() => {
            setMenuVisible(!menuVisible)
            //menu.classList.toggle("hidden")
        }, 100)
    }
    return (
        <div className="header">
            <nav className="menu">
                <h1 className="logo">Logo</h1>

                <div className="buttons">
                    { state == "admin" && <Link to="/carrinho" className="carrinho"><AiOutlineShoppingCart /></Link> }
                    <Link to="/" className="perfil"><BiUser /></Link>
                    { menuVisible ? <RiMenu3Fill onClick={ handleVisibilityMenu } /> : <IoClose onClick={ handleVisibilityMenu }/> }
                </div>

                <div className="visibleMenu">
                    <Link id="home" to="/">Home</Link>
                    { state == "admin" ? <>
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