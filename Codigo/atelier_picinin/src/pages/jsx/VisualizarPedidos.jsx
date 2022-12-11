import "../css/visualizarPedidos/visualizarPedidos.css"

import Message from '../../components/layout/Message'
import Loading from '../../components/layout/Loading'
import Dropdown from '../../components/layout/Dropdown'

import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

const url = "http://localhost:3000"

const VisualizarPedidos = () => {

    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [pedidos, setPedidos] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterDropdownParams, setFilterDropdownParams] = useState("")
    const [status, setStatus] = useState([])

    const location = useLocation()

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
            setShowMessage(true)
        }

        setTimeout(() => setIsLoading(false), 1200)
    }, [])

    useEffect(() => {
        pedidos.sort((pedido1, pedido2) => {
            if (pedido2.dataPedido > pedido1.dataPedido) {
                return 1
            } else if (pedido2.dataPedido < pedido1.dataPedido) {
                return -1
            }

            return 0
        })

        let arrayStatus = []
        pedidos.forEach(pedido => arrayStatus.push(pedido.status))
        arrayStatus = filterDuplicateItemInArray(arrayStatus)

        setStatus(arrayStatus)
    }, [pedidos])

    function filterDuplicateItemInArray(array) {
        var filteredArray = array.filter((item, index) => {
            return array.indexOf(item) === index
        })

        return filteredArray
    }

    function searchStatusInItems(orders) {
        if(filterDropdownParams != "")
            return orders.filter(order => order.status == filterDropdownParams)
        else
            return orders
    }

    function handleFilterOrdersByStatus(e) {
        const value = e.target.value
        setFilterDropdownParams(value)
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

        fetch(`${url}/api/order/updateOrder?id=${ order._id }`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(() => {
            setTypeMessage("success")
            setMessage("Pedido atualizado com sucesso!")
            setShowMessage(true)
        })
        .catch(() => {
            setTypeMessage("error")
            setMessage("Houve um erro ao atualizar o pedido")
            setShowMessage(true)
        })
    }

    function switchButton(order) {
        let newCodStatus, newStatus, text

        if(order.codStatus == "status-0") {
            newCodStatus = "status-1"
            newStatus = "Em preparação"
            text = "Pagamento Realizado"

        } else if(order.codStatus == "status-1") {
            newCodStatus = "status-2"
            newStatus = "Concluido"
            text = "Concluir"
        }

        if(order.codStatus != "status-3" && order.codStatus != "status-2") {
            return  <button className="btn-mudarStatus"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={ () => handleChangeStatus(order, newStatus, newCodStatus) }>{ text }</button>
        }
    }

    function deleteOrder(id) {
        fetch(`${url}/api/order/deleteOrder?id=${ id }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            setTypeMessage("success")
            setMessage("Pedido apagado com sucesso")
            setShowMessage(true)
        })
        .catch(() => {
            setTypeMessage("error")
            setMessage("Houve um erro ao apagar o pedido")
            setShowMessage(true)
        })

        setPedidos(pedidos.filter(({ _id }) => _id !== id))
    }

    return (
        <div className="divTabela">
            <div className="titleButton">
                <h1 className="pedidos-title">Pedidos ({ pedidos.length })</h1>

                <Dropdown options={ status }
                    textDefault="Selecione um status"
                    handleOnChange={ handleFilterOrdersByStatus }
                    notSwitchValue />
            </div>

            { isLoading ?
                <Loading />
                :
                <>
                { showMessage && <Message type={ typeMessage } message={ message } showMessage={ setShowMessage } /> }
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
                            { searchStatusInItems(pedidos).map(pedido => (
                                <>
                                    <tr>
                                        <td>{ findCliente(pedido.idCliente) }</td>
                                        <td>
                                            <button className="carrinho"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target={ "#exampleModal" + pedido._id } >

                                                <AiOutlineShoppingCart />
                                            </button>
                                        </td>
                                        <td>{ formatarData(pedido.dataEntrega) }</td>
                                        <td><span className={ pedido.codStatus }>{ pedido.status }</span></td>
                                        <td>
                                            { (pedido.codStatus == "status-2" || pedido.codStatus == "status-3") &&
                                                 <button className="btn-delete-pedido" onClick={ () => deleteOrder(pedido._id) }><BiTrash /></button> }
                                        </td>
                                    </tr>

                                    <div className="modal fade"
                                        id={ "exampleModal" + pedido._id }
                                        tabIndex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true" >

                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                    Itens do pedido:
                                                </h1>
                                                <button type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close" >
                                                </button>
                                            </div>
                                            
                                            <div className="modal-body">
                                                { pedido.cartItems.map(itensCarrinho => (
                                                    <>
                                                        <div className="cardVisualizar">
                                                        <div className="teste75">
                                                            <div>
                                                                Produto: { itensCarrinho.nome } x
                                                                { itensCarrinho.quantidade } <br />
                                                                <p className="small">
                                                                    { itensCarrinho.sabor }
                                                                </p>
                                                            </div>

                                                            <div>Preço: { itensCarrinho.preco }</div>
                                                        </div>
                                                        </div>
                                                    </>
                                                ))}
                                                { switchButton(pedido) }
                                            </div>
                                                <div className="modal-footer">
                                                    Preço total: { pedido.total }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}

export default VisualizarPedidos;
