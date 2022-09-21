import styles from '../css_components/CartItem.module.css'

import { VscClose } from "react-icons/vsc";

const CartItem = ({ content, addEvent, removeEvent, removeItem }) => {

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={styles["cart-item"]} key={content._id}>
            <div className={styles["info-cart-item"]}>
                <img src={content.img} alt="img" />

                <div className={styles["name-flavors"]}>
                    <h5>{ primeiraLetraMaiuscula(content.nome) }</h5>

                    { content.sabores.map(sabor => <span className={styles.sabores}>{ primeiraLetraMaiuscula(sabor) }</span> ) }
                </div>
            </div>

            <div className={styles["organize-cart-item"]}>
                <div className={styles["manipulation-price"]}>
                    <span className={styles["unit-price"]}><b>R$</b> { content.preco.toFixed(2) }</span>

                    <div className={styles["quantity-manipulation"]}>
                        <button id={content._id} type="button" onClick={ removeEvent }>-</button>
                        <span className={styles["quantity"]}>{ content.quantidade }</span>
                        <button id={content._id} type="button" onClick={ addEvent }>+</button>
                    </div>

                    <span className={styles["total-price"]}><b>R$</b> { content.precoTotal.toFixed(2) }</span>
                </div>

                <VscClose className={styles["remove-button"]} onClick={removeItem} id={content._id}/>
            </div>
        </div>
    )
}

export default CartItem