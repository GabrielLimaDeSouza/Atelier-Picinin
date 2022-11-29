import '../../css/cart/Pagamento.css'

import Progression from '../../../components/cart/modules/Progression'
import SummaryOrder from '../../../components/cart/modules/SummaryOrder'
import Loading from '../../../components/layout/Loading'
import CartItemNoEditable from '../../../components/cart/modules/CartItemNoEditable'
import CartItemMobileNoEditable from '../../../components/cart/modules/CartItemMobileNoEditable'

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { BsTruck, BsCreditCardFill } from "react-icons/bs"
const url = "http://localhost:3000"


const Pagamento = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const data = window.localStorage.getItem("user-cart")

    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState("")
    const [payment, setPayment] = useState(null)
    const [address] = useState(location.state.address || {})
    const [cartItems] = useState(JSON.parse(data))
    const [larguraTela] = useState(window.innerWidth)
    const [subtotal] = useState(location.state.subtotal)
    const [entrega] = useState(location.state.entrega)
    const [orders, setOrders] = useState([])
    const [togleButtonPix, setTogleButtonPix] = useState(false)


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

        if(!data || !data.length) {
            navigate('/')
        }

        setTimeout(() => setIsLoading(false), 600)
    }, [])

    const handleDropdownMenu = () => {
        const summary = document.querySelector('div.summary-order')
        summary.classList.toggle('active')

        const summaryContent = document.querySelector('div.summaryContent')

        !summaryContent.classList.contains('show') ?
            summaryContent.classList.add('show')
        :
            setTimeout(() => summaryContent.classList.remove('show'), 300)
    }

    const handleDeleteCart = () => {
        window.localStorage.removeItem("user-cart")
    }
    
    const handleCreatePaymentModel = () => {
        const order = {
            idCliente: id,
            cartItems,
            address,
            total: subtotal + entrega,
            payment,
            status: "Pagamento pendente"
        }

        fetch(`${url}/api/order/createOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
        })

        handleDeleteCart()
    }

    function handleSetPaymentMethod() {
        setPayment(togleButtonPix ? "" : "Pix")
        setTogleButtonPix(!togleButtonPix)
    }

    return (
        <div className="body-address">
            <div className="infos-pedido_pagamento">
                <div className="title-page">
                    <Progression state="Confirmar Pedido" elements={[ "Carrinho de Compra", "Endereço", "Confirmar Pedido" ]} />
                </div>

                <div className="address-payment_pagamento">
                    <div className="endereco_pagamento">
                        <div className="title-address">
                            <h4 className="title-address"><BsTruck /> Informações do Pedido</h4>
                        </div>
                        <div className="subtitle_pagamento">
                            <h5 className="subtitle-address">Endereço de Entrega</h5>
                            <p className="text-subtitle-address">Este é o endereço onde o seu pedido será enviado</p>
                        </div>
                        <div className="spans">
                            <span><b>{ address.rua }</b></span>
                            <span><b>Número:</b>  { address.numero }</span>
                            <span><b>Bairro:</b>  { address.bairro }</span>
                            <span><b>Cidade:</b>  { address.cidade }</span>
                            <span><b>Complemento:</b>  { address.complemento ? address.complemento : "Não informado" }</span>
                            <span><b>CEP:</b>  { address.cep }</span>
                        </div>
                    </div>

                    <div className="forma-pagamento_pagamento">
                        <div className="title-payment-method">
                            <h4 className="title-payment-method"><BsCreditCardFill /> Forma de Pagamento</h4>
                        </div>
                        <div className="subtitle-payment-method">
                            <button id="pix" className={ togleButtonPix && "active" } onClick={ handleSetPaymentMethod }>Pix</button>
                        </div>
                    </div>
                </div>

                <div className="cart-items_pagamento">
                    { isLoading ?
                        <Loading />
                        :
                        cartItems.length ?
                            larguraTela >= 600 ?
                                cartItems.map( cartItem => <CartItemNoEditable content={ cartItem } /> )
                            :
                                cartItems.map( cartItem => <CartItemMobileNoEditable content={ cartItem } /> )
                        :        
                            <p className="cart-empty">O carrinho está vazio</p>
                    }
                </div>
            </div>

            <div className="summary-order">
                <button type="button" className="dropdown" onClick={ handleDropdownMenu }><div className="line"></div></button>
                
                <div className="summaryContent">
                    <h1>Resumo do pedido</h1>
                    { isLoading ?
                        <Loading />
                        :
                        <SummaryOrder onClick={ handleCreatePaymentModel } subtotal={ subtotal } entrega={ entrega } linkTo="/pix" textLinkTo="Finalizar" isTrue={ payment } metodo_pagamento={ payment }/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Pagamento