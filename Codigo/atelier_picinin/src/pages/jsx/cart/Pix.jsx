import Loading from '../../../components/layout/Loading'
import LinkButton from '../../../components/layout/LinkButton'

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
const url = "http://localhost:3000"

const Pix = () => {
    const location = useLocation()

    const [isLoading, setIsLoading] = useState(true)
    const [total] = useState(location.state.subtotal + location.state.entrega)
    const [payment] = useState(location.state.metodo)

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
        if (!id) {
            navigate('/')
        }

        setTimeout(() => setIsLoading(false), 600)
    }, [])

    return (
        <div className="body-payment">
            <div className="metodo-pagamento">
                <h1>Pagamento via { payment }</h1>
                <h4>Valor: <b>R$</b> { total }</h4>
            </div>

            <div className="qr-code"></div>

            <div className="code-payment">
                <h3 className="code-title">Código { payment }</h3>
                <p className="code-text"></p>
            </div>

            <LinkButton type="button" to="/" classNameButton="btn-voltar">Voltar à tela inicial</LinkButton>

        </div>
    )
}

export default Pix