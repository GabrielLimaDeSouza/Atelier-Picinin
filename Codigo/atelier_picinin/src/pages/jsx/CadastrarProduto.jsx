import '../css/products/CadastrarProduto.css'

import Form from '../../components/products/FormCadastroProdutos'
import CabecalhoAdmin from '../../components/layout/CabecalhoAdmin'
import Button from '../../components/layout/Button'
import Message from '../../components/layout/Message'
import { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'

const CadastrarProduto = () => {
    const [produtos, setProdutos] = useState([])
    const [message, setMessage] = useState('')


    useEffect(() => {
        fetch('http://localhost:3000/produto/getAllProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setProdutos(data))
        .catch(err => console.error(err))
    })

    var dadosJson
    useEffect(() => {
        const token = "IGQVJWQUtmUVBlRElBaUZAMeHI1Q3pKWHM1aGFpaGEzSjFzanlWUFphWGtGWUU2QzlRNGJTc1dPbVVtdWdRMFhFQ2V4NkMyWlRadnNSbXJNeXJLYTNKLXpjQXAwOXczNURoMTF5THBabmRjeG5ZAczhHdwZDZD"
        const url = "https://graph.instagram.com/me/media?access_token=" + token + "&fields=media_url,media_type,caption,permalink"

        fetch(url, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => {
                dadosJson = data.data
                var feed = dadosJson[0]

                var oImg = document.createElement("img");
                oImg.setAttribute('src', feed.media_url);
                oImg.setAttribute('alt', 'na');
                oImg.setAttribute('height', '100px');
                oImg.setAttribute('width', '100px');
                document.getElementById('insta').appendChild(oImg);
            })
            .catch(err => console.error(err))
    }, [])

    // Identificar a linha da tabela clicada
    function idTrClicada(e) {
        const tr = e.target
        var element = tr.parentNode
        while(element.id == false)
            element = element.parentNode

        return element.id
    }

    function deletProduct(e){
        e.preventDefault();
        const id = idTrClicada(e)
        
        fetch(`http://localhost:3000/produto/deleteProduct/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setProdutos(produtos.filter((produto) => produto.id !== id))
            setMessage("Produto removido com sucesso!")
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            <CabecalhoAdmin />
            <div className="body-product">
                <h1 className="title">Cadastro de Produto</h1>
                <div id="insta"></div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Inserir Novo Produto
                </button>
                { message && <Message type="success" message={message} /> }
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Cadastrando Novo Produto</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Form id="form" content={produtos} action="http://localhost:3000/produto/registerProduct" method="post" btnText="Cadastrar" classNameButton="btnCadastrar"/>
                            </div>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <th><span>PRODUTO</span></th>
                        <th><span>SABOR</span></th>
                        <th><span>PREÇO</span></th>
                        <th><span>PEDIDO MÍNIMO</span></th>
                        <th></th>
                    </thead>
                    <tbody>
                        {
                            produtos.map(number =>
                                <tr id={number._id} key={number._id}>
                                    <td>{number.nomeProduto}</td>
                                    <td>{number.saborProduto}</td>
                                    <td>{number.precoProduto}</td>
                                    <td>{number.pedidoMinProduto}</td>
                                    <td><Button type="button" className="btnTrash" buttonClickEvent={deletProduct}>{<BiTrash />}</Button></td>
                                    <td>
                                        
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Alterar
                                        </button>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Alterando Produto</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form id="form" method='put' action={`http://localhost:3000/updateProduct/${number.id}`}>
                                                            <label htmlFor="nome">Nome do Produto:</label>
                                                            <input type="text" name="nome" id="nome" />
                                                            <label htmlFor="descricao">Descrição do Produto:</label>
                                                            <input type="text" name="descricao" id="descricao" />
                                                            <label htmlFor="sabores">Sabor:</label>
                                                            <input type="text" name="sabor" id="sabor" />
                                                            <label htmlFor="preco">Preço:</label>
                                                            <input type="number" name="preco" id="preco" min="0" />
                                                            <label htmlFor="pedidoMinimo">Pedido Mínimo:</label>
                                                            <input type="number" name="pedidoMinProduto" id="pedidoMinProduto" min="0" /><button type="reset" className='btnMais' id="btnMais"><AiOutlinePlus /></button>
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
                                    </td>
                                </tr>                
                            )
                        }
                    </tbody>
                </table> 
            </div>
        </>
    )
}

export default CadastrarProduto