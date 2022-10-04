import styles from '../css/CartItemMobile.module.css'

import Button from '../../layout/Button'

const CartItemMobile = ({ content, handleEditCart }) => {

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
                                <span className={ styles.sabores }>{ primeiraLetraMaiuscula(content.sabores) }</span>
                            </div>
                        </div>

                        <span className={ styles.totalPrice }><b>R$</b> { content.precoTotal.toFixed(2) }</span>
                    </div>
                </div>

                <div className={ styles.quantityManipulation }>
                    <Button type="button" className="add-quantity" buttonClickEvent={ () => handleEditCart(content, "add-quantity") }>+</Button>
                    <span className={ styles.quantity }>{ content.quantidade }</span>
                    <Button type="button" className="remove-quantity" buttonClickEvent={ () => handleEditCart(content, "remove-quantity") }>-</Button>
                </div>
            </div>

            <Button className="btnRemover" buttonClickEvent={ () => handleEditCart(content, "remove-button") } id={ content._id }>
                Remover
            </Button>
        </div>
    )
}

export default CartItemMobile