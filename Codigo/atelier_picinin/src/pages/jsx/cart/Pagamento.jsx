import '../../css/cart/AdicionarEndereco.css'

import Progression from '../../../components/cart/modules/Progression'
import SummaryOrder from '../../../components/cart/modules/SummaryOrder'
import Loading from '../../../components/layout/Loading'
import CartItemNoEditable from '../../../components/cart/modules/CartItemNoEditable'
import CartItemMobileNoEditable from '../../../components/cart/modules/CartItemMobileNoEditable'

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const url = "http://localhost:3000"


const Pagamento = () => {
    const data = window.localStorage.getItem("user-cart")

    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState("")
    const [address, setAddress] = useState({})
    const [cartItems] = useState(JSON.parse(data))
    const [larguraTela] = useState(window.innerWidth)
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

        if(!data || !data.length) {
            navigate('/')
        }

        setTimeout(() => setIsLoading(false), 600)
    }, [])

    function handleDropdownMenu() {
        const summary = document.querySelector('div.summary-order')
        summary.classList.toggle('active')

        const summaryContent = document.querySelector('div.summaryContent')

        !summaryContent.classList.contains('show') ?
            summaryContent.classList.add('show')
        :
            setTimeout(() => summaryContent.classList.remove('show'), 300)
    }

    return (
        <div className="body-address">
            <div className="infos-pedido">
                <div className="title-page">
                    <Progression state="Confirmar Pedido" elements={ [ "Carrinho de Compra", "Endereço", "Confirmar Pedido" ] } />
                </div>

                <div className="address-payment">
                    <div className="endereco">
                        <div className="title-address">
                            <h4 className="title-address">Informações do Pedido</h4>
                        </div>
                        <div className="subtitle-address">
                            <h5 className="subtitle-address">Endereço de Entrega</h5>
                            <p className="text-subtitle-address">Este é o endereço onde o seu pedido será enviado</p>
                        </div>
                        <div className="spans">
                            <span><b>Endereço:</b> { address.rua }</span>
                            <span><b>CEP:</b>  { address.cep }</span>
                            <span><b>Bairro:</b>  { address.bairro }</span>
                            <span><b>Cidade:</b>  { address.cidade }</span>
                            <span><b>Complemento:</b>  { address.complemento ? address.complemento : "Não informado" }</span>
                            <span><b>Número:</b>  { address.numero }</span>
                        </div>
                    </div>

                    <div className="forma-pagamento">
                        <div className="title-payment-method">
                            <h4 className="title-payment-method">Forma de Pagamento</h4>
                        </div>
                        <div className="subtitle-payment-method">
                            <h5 className="pix">Pix</h5>
                        </div>
                    </div>
                </div>

                <div className="cart-items">
                { isLoading ?
                    <Loading />
                    :
                    cartItems.length ?
                        larguraTela >= 600 ?
                            cartItems.map( cartItem => <CartItemNoEditable content={cartItem} /> )
                        :
                            cartItems.map( cartItem => <CartItemMobileNoEditable content={cartItem} /> )
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
                        <SummaryOrder subtotal={ subtotal } entrega={ entrega } linkTo="/pagamento" textLinkTo="Ir para o pagamento" condicional/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Pagamento