import styles from '../css/SummaryOrder.module.css'

import LinkButton from '../../layout/LinkButton'
import Button from '../../layout/Button'

const SummaryOrder = ({ state, subtotal, entrega, linkTo, textLinkTo, isTrue, onClick, metodo_pagamento }) => {
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
                    <span className={styles["tostal-price"]}><b>R$ </b> { (+subtotal + +entrega).toFixed(2) }</span>
                </div>
            </div>

            { subtotal != 0 && isTrue ?
                <LinkButton onClick={ onClick } to={linkTo} type="button" classNameButton="btnPagamento" state={ { address: state, subtotal: subtotal, entrega: entrega, metodo: metodo_pagamento }}>{textLinkTo}</LinkButton>
                :
                <Button type="button" className="btnPagamentoDisabled" disabled>{textLinkTo}</Button>
            }
        </>
    )
}

export default SummaryOrder