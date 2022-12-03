import "../css/visualizarPedidos/visualizarPedidos.css"

import Message from '../../components/layout/Message'
import Loading from '../../components/layout/Loading'

import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiTrash, BiPencil } from "react-icons/bi"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom'

const url = "http://localhost:3000"

const VisualizarPedidos = () => {
    var tamanhoTela = window.innerWidth

    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [pedidos, setPedidos] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    var prioridade = []
    var expirado = []
    var vencendo = []
    var pago = []
    var cancelado = []

    useEffect(() => {
        fetch(`${url}/api/order/getAllOrders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => setPedidos(data))

        fetch(`${url}/api/user/getAllUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => setUsers(data))

        if (location.state) {
            setTypeMessage(location.state.type)
            setMessage(location.state.message)
        }

        setTimeout(() => setIsLoading(false), 1200)
    }, [])

    if (pedidos.length != 0) {
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].status == "Expirado") {
                expirado.push(pedidos[i]);
            } else {
                if (pedidos[i].status == "Vencendo") {
                    vencendo.push(pedidos[i]);
                } else {
                    pago.push(pedidos[i]);
                }
                if (pedidos[i].status == "Cancelado") {
                    cancelado.push(pedidos[i]);
                }
            }
        }

        if (expirado.length != 0) {
            prioridade.push(expirado);
        }
        if (vencendo.length != 0) {
            prioridade.push(vencendo);
        }
        if (pago.length != 0) {
            prioridade.push(pago);
        }

        if (cancelado.length != 0) {
            prioridade.push(cancelado);
        }
    }

    function findCliente(id) {
        return users.find(({ _id }) => _id === id).nome
    }

    function formatarData(date) {
        let data

        if (date) {
            data = new Date(date)
            return data.toLocaleDateString()
        }
    }

    function handleChangeStatus(order, newStatus, newCodStatus) {
        order.codStatus = newCodStatus
        order.status = newStatus
        console.log(order)

        fetch(`${url}/api/order/updateOrder?id=${ order._id }`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(navigate('/adm/pedidos', { state: { message: "Pedido atualizado com sucesso!", type: "success" } }))
        .catch(err => console.error(err))
    }

    function switchButton(element) {
        let newCodStatus, newStatus

        if(element.codStatus == "status-0") {
            newCodStatus = "status-1"
            newStatus = "Em preparação"
            return <button className="btn-mudarStatus" onClick={ () => handleChangeStatus(element, newStatus, newCodStatus) }>Pagamento feito</button>

        } else if(element.codStatus == "status-1") {
            newCodStatus = "status-2"
            newStatus = "Concluido"
            return <button className="btn-mudarStatus" onClick={ () => handleChangeStatus(element, newStatus, newCodStatus) }>Concluir</button>
        }

    }

    return (
        <div className="divTabela">
            { isLoading ?
                <Loading />
                :
                <>
                { message && <Message type={typeMessage} message={message} /> }
                    <table className="table">
                        <thead>
                        <tr>
                            <th>CLIENTE</th>
                            <th>PEDIDO</th>
                            <th>DATA DE ENTREGA</th>

                            <th>STATUS</th>
                            <th>EXCLUIR</th>
                        </tr>
                        </thead>
                        <tbody>
                        {prioridade.map((teste) =>
                            teste.map((element) => (
                            <>
                                <tr>
                                <td>{findCliente(element.idCliente)}</td>
                                <td>
                                    <button
                                    className="carrinho"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#exampleModal" + element._id}
                                    >
                                    <AiOutlineShoppingCart />
                                    </button>
                                </td>
                                <td>{formatarData(element.dataEntrega)}</td>
                                <td><span className={ element.codStatus }>{ element.status }</span></td>
                                <td>
                                    <BiTrash />
                                </td>
                                </tr>
                                <div
                                class="modal fade"
                                id={"exampleModal" + element._id}
                                tabindex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                                >
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Itens do pedido:
                                        </h1>
                                        <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        ></button>
                                    </div>
                                    <div class="modal-body">
                                        {element.cartItems.map((itensCarrinho) => (
                                        <>
                                            <div className="cardVisualizar">
                                            <div className="teste75">
                                                <div>
                                                Produto: {itensCarrinho.nome} x
                                                {itensCarrinho.quantidade} <br />{" "}
                                                <p className="small">
                                                    {itensCarrinho.sabor}
                                                </p>
                                                </div>
                                                <div>Preço: {itensCarrinho.preco}</div>
                                            </div>
                                            </div>
                                        </>
                                        ))}
                                        { switchButton(element) }
                                    </div>
                                    <div class="modal-footer">
                                        Preço total: {element.total}
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </>
                            ))
                        )}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}

export default VisualizarPedidos;
