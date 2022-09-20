import '../css/cart/Carrinho.css'

import Cabecalho from '../../components/layout/CabecalhoCliente'
import CartItem from '../../components/cart/CartItem'
import { useState } from 'react'

const Carrinho = () => {
    const [cartItems, setCartItems] = useState([{ _id: 1111, nome: "Suspiro", sabores: ["sal", "chocolate"], preco: 12.90, quantidade: 6 },
            { _id: 2222, nome: "Goiabada", sabores: ["goiaba", "morango"], preco: 5.60, quantidade: 2 }])

    function findCartItem(id) {
        return cartItems.find(item => item._id == id) 
    }

    function editCartItem(id, attribute, value) {
        const cartItemUpdated = cartItems.reduce((acc, o) => {
            let obj = (id == o._id) ? Object.assign(o, o[attribute] = value) : o
            acc.push(obj)
            return acc
        }, [])

        return cartItemUpdated
    }

    function addQuantity(e) {
        const id = e.target.id
        
        setCartItems(editCartItem(id, "quantidade", findCartItem(id).quantidade + 1))
    }
    
    function decrementQuantity(e) {
        const id = e.target.id
        const cartItem = findCartItem(id)

        if(cartItem.quantidade > 1)
            setCartItems(editCartItem(id, "quantidade", cartItem.quantidade - 1))
    }

    function removeCartItem(e) {
        setCartItems(cartItems.filter(item => item._id != e.target.id))
    }

    return (
        <>
            <Cabecalho />

            <div className="body-cart">
                <div className="cart-content">
                    <div className="title-page">
                        <h1 className="logo">Logo</h1>
                        <span>|</span>
                        <span>Carrinho de Compras</span>
                    </div>

                    <div className="cart-items">
                        { cartItems.map(cartItem => <CartItem content={cartItem} addEvent={addQuantity} removeEvent={decrementQuantity} removeItem={removeCartItem} /> ) }
                    </div>
                </div>

                <div className="summary-order">
                    <h1>Resumo do pedido</h1>

                    <div className="order-price">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carrinho