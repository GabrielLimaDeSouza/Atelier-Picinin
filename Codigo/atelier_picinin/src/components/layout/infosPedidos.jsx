const InfosPedidos = ({ status, codStatus, pagamento, total, dataPedido }) => {
    return (
        <div className={ style.infosPedidos }>
            <div className={ style.status }>
                <h5 className={ style.tituloSecao } >Status</h5>
                <span className={ style[codStatus] }>{ status }</span>
            </div>

            <div className={ style.pagamento }>
                <h5 className={ style.tituloSecao } >Pagamento</h5>
                <span className={ style.pagamento }>{ pagamento }</span>
            </div>

            <div className={ style.total }>
                <h5 className={ style.tituloSecao } >Total</h5>
                <span className={ style.total }>{ total }</span>
            </div>

            <div className={ style.dataPedido }>
                <h5 className={ style.tituloSecao } >Data do Pedido</h5>
                <span className={ style.dataPedido }>{ dataPedido }</span>
            </div>
        </div>
    )
}

export default InfosPedidos