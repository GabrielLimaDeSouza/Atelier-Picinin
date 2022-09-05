import '../css/CadastrarInsumo.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'

const CadastrarInsumo = () => {
    return (
        
        <div className="body">
            <h1 className="title">Cadastro de Insumos</h1>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Inserir Novo Insumo
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Cadastrando Novo Insumo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="form">
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" name="nome" id="nome" />
                                <label htmlFor="descricao">Quantidade Inicial:</label>
                                <input type="text" name="descricao" id="descricao" />
                                <label htmlFor="sabores">Quantidade Mínima:</label>
                                <input type="text" name="sabores" id="sabores" />
                                <label htmlFor="preco">Validade:</label>
                                <input type="number" name="preco" id="preco" min="0" />
                                <button type="submit" class="btn btn-warning " id='cadastrar' >Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <td><span>INSUMO</span></td>
                    <td><span>QUANTIDADE</span></td>
                    <td><span>VALIDADE</span></td>
                    <td><span>STATUS</span></td>
                    <td><span></span></td>
                </thead>
                <tbody>
                    <tr>
                        <td>Farinha 1k</td>
                        <td>0</td>
                        <td>N/P</td>
                        <td class="status-em-falta">EM FALTA</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                    <tr>
                        <td>Açucar 1k</td>
                        <td>4</td>
                        <td>04/05/2022</td>
                        <td class="status-vencido">VENCIDO</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                    <tr>
                        <td>Chocolate barra</td>
                        <td>7</td>
                        <td>07/09/2022</td>
                        <td class="status-vencendo">VENCENDO</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                    <tr>
                        <td>Palitos pacote</td>
                        <td>2</td>
                        <td>N/P</td>
                        <td class="status-ok">OK</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                </tbody>
            </table>
        </div>


    )
}
export default CadastrarInsumo