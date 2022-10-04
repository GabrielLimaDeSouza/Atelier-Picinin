import styles from '../css/CartItem.module.css'

import Button from "../../layout/Button"
import { VscClose } from "react-icons/vsc"

const CartItem = ({ content, handleEditCart }) => {

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
                        <span className={ styles.sabores }>{ primeiraLetraMaiuscula(content.sabores) }</span>
                    </div>
                </div>
            </div>

            <div className={ styles.organizeCartItems }>
                <div className={ styles.manipulationPrice }>
                    <span className={ styles.unitPrice }><b>R$</b> { content.preco.toFixed(2) }</span>

                    <div className={ styles.quantityManipulation }>
                        <Button type="button" className="remove-quantity" buttonClickEvent={ () => handleEditCart(content, "remove-quantity") }>-</Button>
                        <span className={ styles.quantity }>{ content.quantidade }</span>
                        <Button type="button" className="add-quantity" buttonClickEvent={ () => handleEditCart(content, "add-quantity") }>+</Button>
                    </div>

                    <span className={ styles.totalPrice }><b>R$</b> { content.precoTotal.toFixed(2) }</span>
                </div>

                <VscClose className={ styles["remove-button"] } onClick={ () => handleEditCart(content, "remove-button" ) } />
            </div>
        </div>
    )
}

export default CartItem