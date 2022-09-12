import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import '../pages/css/CabecalhoCliente.css'

const CabecalhoCliente = () => {
    return (
        <nav className="div-header">
            <h1 className='logo'>Logo</h1>
            <div className='buttons'>
                <button className="carrinho"><AiOutlineShoppingCart /></button>
                <button className="perfil"><BiUserCircle /></button>
            </div>
        </nav>
    )
}

export default CabecalhoCliente