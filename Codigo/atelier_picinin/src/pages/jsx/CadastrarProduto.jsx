
import '../css/CadastrarProduto.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { useState, useEffect, useNavigate } from 'react'
import { useLocation } from 'react-router-dom'



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
                            <Form id="form" action="http://localhost:3000/produto/" method="post" btnText="Cadastrar" classNameButton="cadastrar"/>
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