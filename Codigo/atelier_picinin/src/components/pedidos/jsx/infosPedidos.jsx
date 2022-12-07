import style from '../css/infosPedidos.module.css'

const InfosPedidos = ({ status, codStatus, pagamento, total, dataPedido }) => {
    function formatDate(data) {
        return new Date(data).toLocaleDateString();
    }

    return (
        <div className={ style.infosPedidos }>
            <em className={ style.status }>
                <h5 className={ style.tituloSecao } >Status</h5>
                <span className={ style[codStatus] }>{ status }</span>
            </em>

            <em className={ style.pagamento }>
                <h5 className={ style.tituloSecao } >Pagamento</h5>
                <span>{ pagamento }</span>
            </em>

            <em className={ style.total }>
                <h5 className={ style.tituloSecao } >Total</h5>
                <span>R$ { total }</span>
            </em>

            <em className={ style.dataPedido }>
                <h5 className={ style.tituloSecao } >Data do Pedido</h5>
                <span>{ formatDate(dataPedido) }</span>
            </em>
        </div>
    )
}

export default InfosPedidos