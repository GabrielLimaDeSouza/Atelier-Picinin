import '../css/CadastrarProduto.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'

const CadastrarProduto = () => {
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
                                <button type="submit" class="btn btn-warning " id='cadastrar' >Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <td><span>PRODUTO</span></td>
                    <td><span>SABOR</span></td>
                    <td><span>PREÇO</span></td>
                    <td><span>PEDIDO MÍNIMO</span></td>
                    <td></td>
                </thead>
                <tbody>
                    <tr>
                        <td>Suspiro</td>
                        <td>Leite Ninho</td>
                        <td>150</td>
                        <td>5</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                    <tr>
                        <td>Suspiro</td>
                        <td>Morango</td>
                        <td>40</td>
                        <td>10</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CadastrarProduto