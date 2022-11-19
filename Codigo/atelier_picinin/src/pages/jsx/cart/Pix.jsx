import Loading from '../../../components/layout/Loading'
import LinkButton from '../../../components/layout/LinkButton'

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
const url = "http://localhost:3000"

const Pix = () => {
    const location = useLocation().state

    const [isLoading, setIsLoading] = useState(true)
    const [total] = useState(parseFloat(location.subtotal) + location.entrega)
    const [payment] = useState(location.metodo)
    const [qrcode, setQrcode] = useState("")
    const [codePix, setCodePix] = useState("")

    const qrCode = async() => {
        const orderPix = {
            valorPix: total.toFixed(2),
            message: "Pagamento do pedido"
        }

        const qrCodeImg = await fetch(`${url}/api/pagamento/pix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPix)
        }).then(resp => resp.json())
        .then(data => {
            setQrcode(data.imagemQrcode)
            setCodePix(data.qrcode)
        })
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
        if (!id) {
            navigate('/')
        }

        qrCode();

        setTimeout(() => setIsLoading(false), 1000)
    }, [])

    return (
        <div className="body-payment">
            { isLoading ?
                <Loading />
                :
                <>
                    <div className="metodo-pagamento">
                        <h1>Pagamento via { payment }</h1>
                        <h4>Valor: <b>R$</b> { total.toFixed(2) }</h4>
                    </div>

                    <div className="qr-code"><img src={ qrcode } alt="" /></div>

                    <div className="code-payment">
                        <h3 className="code-title">Código { payment }</h3>
                        <p className="code-text">{ codePix }</p>
                    </div>

                    <LinkButton type="button" to="/" classNameButton="btn-voltar">Voltar à tela inicial</LinkButton>
                </>
            }
        </div>
    )
}

export default Pix