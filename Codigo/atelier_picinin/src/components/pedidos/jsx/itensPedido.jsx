import style from '../css/itensPedido.module.css'

import Button from '../../layout/Button'
import CartItemNoEditable from '../../cart/modules/CartItemNoEditable'
import CartItemMobileNoEditable from '../../cart/modules/CartItemMobileNoEditable'

const ItensPedido = ({ status, endereco, entrega, cartItems, cancelar, larguraTela }) => {
    console.log(endereco)
    console.log(entrega)
    console.log(cartItems)
    console.log(larguraTela)

    return (
        <div className={ style.itensPedido }>
            <div className={ style.cabecalho }>
                <div className={ style.enderecoEntrega }>
                    <div className={ style.endereco }>
                        <h5>Endereco:</h5>
                        <span>Rua { endereco.rua }, Nº { endereco.numero }</span>
                        <span>{ endereco.bairro } CEP { endereco.cep } - { endereco.cidade }, { endereco.estado }</span>
                    </div>

                    <div className={ style.entrega }>
                        <h5>Entrega:</h5>
                        { entrega == 0 ? <span className={style.gratis}>Gratis</span> : <span>R$ { entrega }</span> }
                    </div>
                </div>
                { status == "Pagamento pendente" && 
                    <div className={ style.cancelarPedido }>
                        <Button type="button" className="btnRemover" buttonClickEvent={ cancelar }>Cancelar Pedido</Button>
                    </div>
                }
            </div>

            <div className={ style.itensCarrinho }>
                { larguraTela >= 600 ?
                    cartItems.map( cartItem => <CartItemNoEditable content={ cartItem } /> )
                :
                    cartItems.map( cartItem => <CartItemMobileNoEditable content={ cartItem } /> )
                }
            </div>
        </div>
    )
}

export default ItensPedido