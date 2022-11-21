import styles from '../css/CartItem.module.css'

const CartItemEditable = ({ content }) => {

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={ styles["cart-item"] } key={ content._id }>
            <div className={ styles.infosCart }>
                <img src={ content.img } alt="img" />

                <div className={ styles.nameFlavors }>
                    <h5 className={ styles.productTitle }>{ primeiraLetraMaiuscula(content.nome) }</h5>

                    <div className={styles.divSabores}>
                        <span className={ styles.sabores }>{ primeiraLetraMaiuscula(content.sabor) }</span>
                    </div>
                </div>
            </div>

            <div className={ styles.organizeCartItems }>
                <div className={ styles.manipulationPrice }>
                    <span className={ styles.quantity }>Quant: { content.quantidade }</span>
                    <span className={ styles.totalPrice }><b>R$</b> { content.precoTotal.toFixed(2) }</span>
                </div>
            </div>
        </div>
    )
}

export default CartItemEditable