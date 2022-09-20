import { VscClose, VscAdd, VscDash } from "react-icons/vsc";

const CartItem = ({ content, addEvent, removeEvent, removeItem }) => {

    return (
        <div key={content._id}>
            <div className="info-cart-item">
                <img src="" alt="img" />
                <div className="name-flavors">
                    <h5 >{ content.nome }</h5>
                    { content.sabores.map(sabor => <span className="sabores">{sabor}</span> ) }
                </div>
            </div>

            <div className="moanipulation-price">
                <span className="unit-price">R$ { content.preco }</span>
                <div className="quantity-manipulation">
                    <button id={content._id} type="button" onClick={ removeEvent }>-</button>
                    <span className="quantity">{ content.quantidade }</span>
                    <button id={content._id} type="button" onClick={ addEvent }>+</button>
                </div>
                <span className="total-price">R$ {(content.quantidade * content.preco).toFixed(2)}</span>
            </div>

            <VscClose onClick={removeItem} id={content._id}/>
        </div>
    )
}

export default CartItem