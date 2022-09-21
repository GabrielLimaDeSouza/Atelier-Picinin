import styles from '../css_components/SummaryOrder.module.css'

import LinkButton from '../../components/layout/LinkButton'

const SummaryOrder = ({ subtotal, entrega }) => {
    return (
        <>
            <div className={styles["order-price"]}>
                <div className={styles.subtotal}>
                    <span className={styles["subtotal-label"]}>Subtotal</span>
                    <span className={styles["subtotal-price"]}><b>R$ </b> { subtotal }</span>
                </div>

                <div className={styles.shipping}>
                    <span className={styles["shipping-label"]}>Entrega</span>
                    <span className={styles["shipping-price"]}>{ entrega ? (<b>R$ </b> + entrega.toFixed(2)) : <b>Grátis</b> }</span>
                </div>

                <div className={styles.total}>
                    <span className={styles["total-label"]}>Total</span>
                    <span className={styles["total-price"]}><b>R$ </b> { (+subtotal + +entrega).toFixed(2) }</span>
                </div>
            </div>
            <LinkButton to="/" type="button" classNameButton="btnPagamento">Ir para pagamento</LinkButton>
        </>
    )
}

export default SummaryOrder