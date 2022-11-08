
import '../css/visualizarPedidos/visualizarPedidos.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiTrash, BiPencil } from 'react-icons/bi'
import { useState, useEffect } from "react"
const VisualizarPedidos = () => {
    const [pedidos, setPedidos] = useState([])

    const url = 'http://localhost:3000'
    fetch(`${url}/api/order/getAllOrders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
        .then(data => setPedidos(data))
    var prioridade = []
    var expirado = []
    var vencendo = []
    var pago = []
    if (pedidos.length != 0) {
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].status == "expirado") {
                expirado.push(pedidos[i]);
            } else {
                if (pedidos[i].status == "vencendo") {
                    vencendo.push(pedidos[i])
                }
                else {
                    pago.push(pedidos[i])
                }
            }
        }


        if (expirado.length != 0) {
            prioridade.push(expirado)
        }
        if (vencendo.length != 0) {
            prioridade.push(vencendo)
        }
        if (pago.length != 0) {
            prioridade.push(pago)
        }
        prioridade = prioridade[0]
        console.log(prioridade.length)
    }

    return (
        <>
            <div className="divTabela">
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>CLIENTE</th>
                                <th>PEDIDO</th>
                                <th>DATA DE ENTREGA</th>
                                <th>LIMITE DE PAGAMENTO</th>
                                <th>STATUS</th>
                                <th>EXCLUIR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prioridade.map(element => (
                                <><tr>
                                    <td>{element.idCliente}</td>
                                    <td><button type="button" data-bs-toggle="modal" data-bs-target={"#exampleModal" + element._id}>
                                        <AiOutlineShoppingCart /></button></td>
                                    <td>{element.dataDeEntrega}</td>
                                    <td>{element.limiteDePagamento}</td>
                                    <td>{
                                        element.status == "pago" ? <td><span className='_ok_3m2o5_87'>PAGO</span></td> : element.status == "vencendo" ? <td><span className='_vencendo_3m2o5_107'>VENCENDO</span></td> : <td><span className='_vencendo_3m2o5_107'>PENDENTE</span></td>
                                    }</td>
                                    <td><BiTrash /></td>
                                </tr>
                                    <div class="modal fade" id={"exampleModal"+ element._id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Itens do pedido:</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    {element.cartItems.map(itensCarrinho => <>
                                                    <div className='cardVisualizar'>
                                                        <div className='teste75'>
                                                        <div>Produto: {(itensCarrinho.nome)} x{(itensCarrinho.quantidade)} <br /> <p className='small'>{itensCarrinho.sabor}</p></div>
                                                        <div>Preço: {(itensCarrinho.preco)}</div>
                                                        </div>
                                                        
                                                    </div></>)}
                                                    
                                                </div>
                                                <div class="modal-footer">
                                                    Preço total: {element.total}
                                            
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}

                        </tbody>
                    </table>
                </>
            </div>
        </>
    )
}

export default VisualizarPedidos