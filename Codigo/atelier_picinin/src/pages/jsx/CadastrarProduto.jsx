import '../css/CadastrarProduto.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import Tables from '../../components/Tables'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Form from '../../components/FormCadastroProdutos'

const CadastrarProduto = () => {


    const [teste, setTest] = useState([[]]);



    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:3000/produto', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    }).then((resp)=> resp.json())
    .then((data)=>{
        console.log(data)
        setTest(data)
        
    }).catch((err)=>console.log(err))
        },100)
    },[])



    

    return (
        <div className="body">
            <h1 className="title">Cadastro de Produto</h1>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Inserir Novo Produto
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Cadastrando Novo Produto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="form" method='post' action='http://localhost:3000/produto/'>
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
                                <button type="submit" class="btn btn-warning " id='cadastrar' >Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <table id='tabela'>
                <thead>
                    <td><span>PRODUTO</span></td>
                    <td><span>SABOR</span></td>
                    <td><span>PREÇO</span></td>
                    <td><span>PEDIDO MÍNIMO</span></td>
                    <td></td>
                </thead>

                
                   
                {
                    teste.map(number =>
                        <tr>
                            <td>{number.nomeProduto}</td>
                            <td>{number.saborProduto}</td>
                            <td>{number.precoProduto}</td>
                            <td>{number.pedidoMinProduto}</td>
                            <td></td>
                        </tr>                
                    )
                 }
                  
                
                    
                
                
            </table> 
        </div>
    )
}

export default CadastrarProduto