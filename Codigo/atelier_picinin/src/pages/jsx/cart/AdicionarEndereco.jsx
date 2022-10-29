import '../../css/cart/AdicionarEndereco.css'

import Progression from '../../../components/cart/modules/Progression'
import Form from '../../../components/cart/modules/FormAddress'
import SummaryOrder from '../../../components/cart/modules/SummaryOrder'
import Loading from '../../../components/layout/Loading'
import Message from '../../../components/layout/Message'
import Button from '../../../components/layout/Button'

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const url = "http://localhost:3000"


const AdicionarEndereco = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState("")
    const [adresses, setAdresses] = useState([])
    const [addressSelected, setAddressSelected] = useState({})
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [saveAddress, setSaveAddress] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()
    const [subtotal] = useState(location.state.subtotal)
    const [entrega] = useState(location.state.entrega)

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
    }, [])

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

    function handleDropdownMenu() {
        const summary = document.querySelector('div.summary-order')
        summary.classList.toggle('active')

        const summaryContent = document.querySelector('div.summaryContent').classList

        summaryContent.contains('show') ?
            setTimeout(() => summaryContent.remove('show'), 300)
        :
            summaryContent.add('show')
    }

    function handleSaveAddress() {
        setSaveAddress(!saveAddress)
    }

    return (
        <div className="body-address">
            <div className="formAddress">
                <div className="title-page">
                    <Progression state="Endereço" elements={ [ "Carrinho de Compra", "Endereço", "Confirmar Pedido" ] } />
                </div>

                { message && <Message type={ typeMessage } message={ message } /> }

                <div className="content">
                    { saveAddress ?
                        <Form handleSubmit={ handleEditAddress } buttonClickEvent={ handleSaveAddress }/>
                    :
                        <>
                            <div className="selectAddress">
                                <label htmlFor="enderecoSalvo">Endereços Salvos</label>
                                <select id="enderecoSalvo" name="enderecoSalvo" className="select" onChange={ handleSelectAddress }>
                                    <option value="">Selecione um endereço</option>
                                    { adresses.map(address => 
                                            <option key={ address.idAddress } value={ address.idAddress }> { address.rua }</option>
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
                    <Button type="button" className="btnCadastrar" buttonClickEvent={ handleSaveAddress }>{ !saveAddress ? "Adicionar Endereço" : "Fechar" }</Button>
                </div>
            </div>

            <div className="summary-order">
                <button type="button" className="dropdown" onClick={ handleDropdownMenu }><div className="line"></div></button>
                
                <div className="summaryContent">
                    <h1>Resumo do pedido</h1>
                    { isLoading ?
                        <Loading />
                        :
                        <SummaryOrder subtotal={ subtotal } entrega={ entrega } linkTo="/pagamento" textLinkTo="Ir para o pagamento" condicional={ Object.keys(addressSelected).length }/>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdicionarEndereco