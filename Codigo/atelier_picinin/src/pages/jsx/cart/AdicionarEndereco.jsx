
import Cabecalho from '../../../components/layout/CabecalhoCliente'
import Progression from '../../../components/cart/Progression'

const AdicionarEndereco = () => {
    return (
        <>
            <Cabecalho />

            <div className="body-address">
                <div className="title-page">
                    <h1 className="logo">Logo</h1>
                    <span>|</span>
                    <Progression state={[true, false, false]} elements={["Carrinho de Compra", "Endereço", "Confirmar Pedido"]} />
                </div>
            </div>
        </>
    )
}

export default AdicionarEndereco