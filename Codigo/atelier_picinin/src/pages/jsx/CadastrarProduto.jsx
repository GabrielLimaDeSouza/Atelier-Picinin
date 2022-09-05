import '../css/CadastrarProduto.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import Tables from '../../components/Tables'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Form from '../../components/FormCadastroProdutos'

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
                            <Form id="form" action="" method="" btnText="Cadastrar" classNameButton="cadastrar"/>
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