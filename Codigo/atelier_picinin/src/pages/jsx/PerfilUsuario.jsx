import '../css/cart/AdicionarEndereco.css'
import '../css/perfil/PerfilUsuario.css'

import { BiUser } from 'react-icons/bi'

import Form from '../../components/cart/modules/FormAddress'
import Message from '../../components/layout/Message'
import Button from '../../components/layout/Button'

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
const url = "http://localhost:3000"


const PerfilUsuario = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState("")
    const [user, setUser] = useState([])
    const [adresses, setAdresses] = useState([])
    const [addressSelected, setAddressSelected] = useState({})
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState('')
    const [messageDelete, setMessageDelete] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [saveAddress, setSaveAddress] = useState(false)
    const navigate = useNavigate()

    function getCookie(name) {
        let cookie = {}

        document.cookie.split(';').forEach((el) => {
            let [k, v] = el.split('=')
            cookie[k.trim()] = v
        })

        return cookie[name]
    }


    useEffect(() => {
        fetch('http://localhost:3000/api/order/getAllOrders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err))
    }, [])


    useEffect(() => {
        const id = getCookie("_id")
        if (id) {
            setId(id)
        } else {
            navigate('/')
        }
        fetch(`http://localhost:3000/api/user/getUserById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => setUser(data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        const id = getCookie("_id")
        if (id) {
            setId(id)
        } else {
            navigate('/')
        }

        fetch(`${url}/api/address/getAddressById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setAdresses(data)
            })
            .catch(err => console.error(err))

        setTimeout(() => setIsLoading(false), 600)
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
                setAdresses(adresses => [...adresses, data])
            })
            .catch(err => console.error(err))
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
                setMessageDelete("Endereço removido com sucesso!")
            })
            .then(() => {
                setAddressSelected({})
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <div className="body-address">
                <div className="formAddress">
                    <div className="content">
                        <div className='nomeUsuarioPerfil'>
                            <h1><BiUser /> {user.nome}</h1>
                        </div>
                        {message && <Message type={typeMessage} message={message} />}
                        {messageDelete && <Message type={typeMessage} message={messageDelete} />}
                        <h2 className='tituloSection'>Meus Endereços: </h2>
                        {saveAddress ?
                            <Form handleSubmit={handleEditAddress} buttonClickEvent={handleSaveAddress} />
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
                                    {Object.keys(addressSelected).length ?
                                        <div className="spans">
                                            <span><b>Endereço:</b> {addressSelected.rua}</span>
                                            <span><b>CEP:</b>  {addressSelected.cep}</span>
                                            <span><b>Bairro:</b>  {addressSelected.bairro}</span>
                                            <span><b>Cidade:</b>  {addressSelected.cidade}</span>
                                            <span><b>Complemento:</b>  {addressSelected.complemento ? addressSelected.complemento : "Não informado"}</span>
                                            <span><b>Número:</b>  {addressSelected.numero}</span>
                                        </div>
                                        :
                                        <p className="unselectedAdress">Selecione um endereço</p>
                                    }
                                </div>
                            </>
                        }
                        <Button type="button" className="btnCadastrar" buttonClickEvent={handleSaveAddress}>{!saveAddress ? "Adicionar Endereço" : "Fechar"}</Button>
                        {Object.keys(addressSelected).length > 0 &&
                            < Button type="button" className="btnExcluirEndereco" buttonClickEvent={handleDeleteAdress}>Excluir Endereço</Button>
                        }
                    </div>
                </div>
                <div className='pedidosPerfilUsuario'>
                    <h2 className='tituloSection meusPedidosh2'>Meus Pedidos: </h2>
                    {
                        orders.map((order, index) =>
                            order.idCliente == getId() &&
                            <div class="dropdown-center dropPerfil">
                                <button className="btn btn-secondary dropdown-toggle drop dropPerfilButton" id="dropdownProduto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Pedido {index + 1}
                                </button>
                                <ul className="dropdown-menu dropdownMenuItens">
                                    {
                                        order.cartItems.map(item =>
                                            <div className='divItensPedidoPerfil'>
                                                <p className="nomeProdutoPerfil">{item.nome}</p>
                                                <p><span className='spanPedido'>Sabor: </span>{item.sabor}</p>
                                                <p><span className="spanPedido">Quantidade: </span>{item.quantidade}</p>
                                                <p><span className="spanPedido">R$</span> {item.precoTotal}</p>
                                            </div>
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default PerfilUsuario