import '../css/CadastrarProduto.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import Tables from '../../components/Tables'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'

const CadastrarProduto = () => {
    function deleteProduct(e){
        const btn = e.target
        var element = btn.parentNode
        while(element.id == false)
            element = element.parentNode

    }

    // Array com as colunas do cabeçalhos
    const arrayHeader = ["PRODUTO", "SABOR", "PREÇO", "PEDIDO MÍNIMO", ""] // [coluna1, coluna2, coluna3...]

    // Array com as propriedade dos objetos
    const arrayProperties = ["nomeProduto"] // [coluna1, coluna2, coluna3...]

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/products/viewAllProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setProdutos(data))
        .catch(err => console.error(err))
    })

    return (
        <div className="body">
            <h1 className="title">Cadastro de Produto</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Inserir Novo Produto
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cadastrando Novo Produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="form">
                                <label htmlFor="nome">Nome do Produto:</label>
                                <input type="text" name="nome" id="nome" />
                                <label htmlFor="descricao">Descrição do Produto:</label>
                                <input type="text" name="descricao" id="descricao" />
                                <label htmlFor="sabores">Sabor:</label>
                                <input type="text" name="sabores" id="sabores" />
                                <label htmlFor="preco">Preço:</label>
                                <input type="number" name="preco" id="preco" min="0" />
                                <label htmlFor="pedidoMinimo">Pedido Mínimo:</label>
                                <input type="number" name="pedidoMinimo" id="pedidoMinimo" min="0" /><button type="reset" className='btnMais' id="btnMais"><AiOutlinePlus /></button>
                                <label htmlFor="foto1">Foto de capa:</label>
                                <input type="file" name="foto1" id="foto1" />
                                <label htmlFor="foto2">Segunda foto:</label>
                                <input type="file" name="foto2" id="foto2" />
                                <label htmlFor="foto3">Terceira foto:</label>
                                <input type="file" name="foto3" id="foto3" />
                                <button type="submit" className="btn btn-warning " id='cadastrar' >Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Tables arrayHeader={arrayHeader}
                itens={produtos}
                arrayProperties={arrayProperties}
                textButton={
                    <Button type="button" text={<BiTrash />}
                    className="btnLixeira"
                    event={deleteProduct} />
                    }
            />
        </div>
    )
}

export default CadastrarProduto