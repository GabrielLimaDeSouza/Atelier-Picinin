import React from 'react'
import { Link } from 'react-router-dom'

import '../pages/css/Cabecalho.css'

const Cabecalho = () => {
    return (
        <nav className="div-header">
            <Link to="/">
                <h1 className='logo'>Logo</h1>
            </Link>
            <Link to="/cadastrarProduto">Cadastrar Produtos</Link>
            <Link to="/estoque">Estoque</Link>
        </nav>
    )
}

export default Cabecalho