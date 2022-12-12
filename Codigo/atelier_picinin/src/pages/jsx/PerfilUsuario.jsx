import '../css/cart/AdicionarEndereco.css'
import '../css/perfil/PerfilUsuario.css'

import Form from '../../components/cart/modules/FormAddress'
import Message from '../../components/layout/Message'
import Button from '../../components/layout/Button'
import Loading from '../../components/layout/Loading'
import InfosPedidos from '../../components/pedidos/jsx/infosPedidos'
import ItensPedido from '../../components/pedidos/jsx/itensPedido'
import CollapseElement from '../../components/layout/CollapseElement'

import { BiUser } from 'react-icons/bi'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
const url = "http://localhost:3000"


const PerfilUsuario = () => {
    const larguraTela = window.innerWidth

    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState("")
    const [user, setUser] = useState([])
    const [adresses, setAdresses] = useState([])
    const [addressSelected, setAddressSelected] = useState({})
    const [orders, setOrders] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [saveAddress, setSaveAddress] = useState(false)
    
    const navigate = useNavigate()

    const initialArray = []
    orders.forEach(() => initialArray.push(false))

    const [dropdown, setDropdown] = useState(initialArray)

    function dropdownConfig({ index }) {
        dropdown[index] = !dropdown[index]

        setDropdown(array => [...array])
    }

    function getCookie(name) {
        let cookie = {}

        document.cookie.split(';').forEach((el) => {
            let [k, v] = el.split('=')
            cookie[k.trim()] = v
        })

        return cookie[name]
    }

    useEffect(() => {
        const id = getCookie("_id")

        if (id) {
            setId(id)
        } else {
            navigate('/')
        }

        fetch(`${url}/api/order/getOrderById?id=${ id }`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setOrders(data))
        .catch(err => console.error(err))

        fetch(`${url}/api/user/getUserById?id=${ id }`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setUser(data))
        .catch(err => console.error(err))

        setTimeout(() => setIsLoading(false), 1200)
    }, [])

    useEffect(() => {
        const id = getCookie("_id")
        if (id) {
            setId(id)
        } else {
            navigate('/')
        }

        fetch(`${url}/api/address/getAddressById?id=${ id }`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => setAdresses(data))
        .catch(err => console.error(err))
    }, [adresses])

    function handleSelectAddress(e) {
        const selected = e.target.value
        const address = selected && adresses.find(address => address.idAddress === selected)
        setAddressSelected(address)
    }

    function handleEditAddress(address) {
        fetch(`${url}/api/address/registerAddress?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        })
            .then(resp => resp.json())
            .then(data => {
                setTypeMessage("success")
                setMessage("Endereço adicionado com sucesso!")
                setShowMessage(true)
                setAdresses(adresses => [...adresses, data])
            })
            .catch(() => {
                setTypeMessage("error")
                setMessage("Houve um erro ao adicionar o endereço")
                setShowMessage(true)
            })
    }

    function handleSaveAddress() {
        setSaveAddress(!saveAddress)
    }

    function getId() {
        let cookie = {}

        document.cookie.split(';').forEach((el) => {
            let [k, v] = el.split('=')
            cookie[k.trim()] = v
        })

        return cookie["_id"]
    }

    function handleDeleteAdress() {
        fetch(`${url}/api/address/deleteAddress?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            setTypeMessage("success")
            setMessage("Endereço removido com sucesso!")
            setShowMessage(true)
        })
        .then(() => {
            setAddressSelected({})
        })
        .catch(() => {
            setTypeMessage("error")
            setMessage("Houve um erro ao remover o endereço")
            setShowMessage(true)
        })
    }

    function ordernarPedidos(arr) {
        return arr.sort((pedido1, pedido2) => {
            if (pedido2.dataPedido > pedido1.dataPedido) {
                return 1
            } else if (pedido2.dataPedido < pedido1.dataPedido) {
                return -1
            }

            return 0
        })
    }

    function handleCancelPedido(order) {
        order.status = "Cancelado"
        order.codStatus = "status-3"

        fetch(`${url}/api/order/updateOrder?id=${order._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order)
        }).catch((err) => console.error(err))
    }

    return (
        <>
            <div className="body-perfil">
                <div className='nomeUsuarioPerfil'>
                    <h1><BiUser /> {user.nome}</h1>
                </div>

                <div className="content">
                    <div className="formAddress">
                        { showMessage && <Message type={ typeMessage } message={ message } showMessage={setShowMessage}/> }

                        <h2 className='tituloSection'>Meus Endereços: </h2>

                        { saveAddress ?
                            <Form handleSubmit={ handleEditAddress } buttonClickEvent={ handleSaveAddress } />
                            :
                            <>
                                <div className="selectAddress">
                                    <label htmlFor="enderecoSalvo">Endereços Salvos</label>
                                    <select id="enderecoSalvo" name="enderecoSalvo" className="select selectAdressPerfil" onChange={handleSelectAddress}>
                                        <option selected value="">Selecione um endereço</option>
                                        {adresses.map(address =>
                                            <option key={address.idAddress} value={address.idAddress}> {address.rua}</option>
                                        )
                                        }
                                    </select>
                                </div>

                                <div className="endereco">
                                    { Object.keys(addressSelected).length ?
                                        <div className="spans">
                                            <span><b>Endereço:</b> { addressSelected.rua }</span>
                                            <span><b>CEP:</b>  { addressSelected.cep }</span>
                                            <span><b>Bairro:</b>  { addressSelected.bairro }</span>
                                            <span><b>Cidade:</b>  { addressSelected.cidade }</span>
                                            <span><b>Complemento:</b>  { addressSelected.complemento ? addressSelected.complemento : "Não informado" }</span>
                                            <span><b>Número:</b>  { addressSelected.numero }</span>
                                        </div>
                                        :
                                        <p className="unselectedAdress">Selecione um endereço</p>
                                    }
                                </div>
                            </>
                        }

                        <Button type="button" className="btnCadastrar" buttonClickEvent={handleSaveAddress}>{!saveAddress ? "Adicionar Endereço" : "Fechar"}</Button>
                        
                        { Object.keys(addressSelected).length > 0 &&
                            <Button type="button" className="btnExcluirEndereco" buttonClickEvent={handleDeleteAdress}>Excluir Endereço</Button>
                        }
                    </div>
                    
                    <div className='pedidosPerfilUsuario'>
                        <h2 className='tituloSection meusPedidosh2'>Meus Pedidos: </h2>
                        { isLoading ?
                            <Loading />
                            :
                            ordernarPedidos(orders).map((order, index) => (
                                <div className="teste">
                                    <CollapseElement isOpened={ dropdown[index] }
                                        buttonClickEvent={() => dropdownConfig({ index: index })}
                                        text={
                                            <InfosPedidos status={ order.status }
                                                codStatus={ order.codStatus }
                                                pagamento={ order.payment }
                                                total={ order.total }
                                                dataPedido={ order.dataPedido }/>
                                        }>
                                            {
                                                larguraTela  >= 700 &&
                                                    <ItensPedido status={ order.status }
                                                        endereco={ order.address }
                                                        entrega={ order.entrega }
                                                        dataEntrega={ order.dataEntrega }
                                                        cartItems={order.cartItems}
                                                        cancelar={ () => handleCancelPedido(order) }
                                                        larguraTela={ larguraTela } />
                                            }
                                    </CollapseElement>
                                </div>
                            ))
                        }
                    </div>
                    </div>
                </div>
        </>
    )
}

export default PerfilUsuario