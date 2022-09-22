import styles from '../css_components/CartItemMobile.module.css'

import Input from '../layout/Inputs'
import Button from '../layout/Button'

const CartItemMobile = ({ content, handleEditCart }) => {

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={ styles["cart-item"] } key={ content._id }>
            <div className={ styles["info-cart-item"] }>
                <div className={ styles["cart-info"] }>
                    <img src={ content.img } alt="img" />

                    <div className={ styles.infos }>
                        <div className={ styles["name-price"] }>
                            <h5>{ primeiraLetraMaiuscula(content.nome) }</h5>
                            <span className={ styles["unit-price"] }><b>R$</b> { content.preco.toFixed(2) }</span>
                        </div>

                        <div className={styles.divSabores}>
                            { content.sabores.map(sabor => <span className={ styles.sabores }>{ primeiraLetraMaiuscula(sabor) }</span> ) }
                        </div>

                        <span className={ styles["total-price"] }>Total: <b>R$</b> { content.precoTotal.toFixed(2) }</span>
                    </div>
                </div>

                <Input type="number"
                    name="quantidade"
                    id="quantidade"
                    min={ 1 }
                    value={ content.quantidade }
                    handleOnBlur={ (e) => handleEditCart(content, "input-quantity", e) }
                    htmlFor="quantidade"
                    textLabel="Quantidade"
                />
            </div>

            <Button className="btnRemover" buttonClickEvent={ () => handleEditCart(content, "remove-button") } id={ content._id }>
                Remover
            </Button>
        </div>
    )
}

export default CartItemMobile