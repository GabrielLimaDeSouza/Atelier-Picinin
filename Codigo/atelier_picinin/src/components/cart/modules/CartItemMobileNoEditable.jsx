import styles from '../css/CartItemMobile.module.css'


const CartItemMobileEditable = ({ content }) => {

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={ styles["cart-item"] } key={ content._id }>
            <div className={ styles.infosCart }>
                <div className={ styles.cartContent }>
                    <img src={ content.img } alt="img" />

                    <div className={ styles.textItem }>
                        <div>
                            <h5>{ primeiraLetraMaiuscula(content.nome) }</h5>

                            <div className={styles.divSabores}>
                                <span className={ styles.sabor }>{ primeiraLetraMaiuscula(content.sabor) }</span>
                            </div>
                        </div>

                        <span className={ styles.totalPrice }><b>R$</b> { content.precoTotal.toFixed(2) }</span>
                    </div>
                </div>

                <div className={ styles.quantityManipulation }>
                    <span className={ styles.quantity }>Quantidade: { content.quantidade }</span>
                </div>
            </div>
        </div>
    )
}

export default CartItemMobileEditable