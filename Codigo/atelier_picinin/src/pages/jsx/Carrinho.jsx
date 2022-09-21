import '../css/cart/Carrinho.css'

import Cabecalho from '../../components/layout/CabecalhoCliente'
import Loading from '../../components/layout/Loading'
import CartItem from '../../components/cart/CartItem'
import SummaryOrder from '../../components/cart/SummaryOrder'

import { useState, useEffect } from 'react'

const Carrinho = () => {
    const mockup = [{ _id: 1111, img: "http://via.placeholder.com/150.png", nome: "Suspiro", sabores: ["sal", "chocolate"], preco: 12.90, quantidade: 6, precoTotal: 77.40 },
    { _id: 2222, img: "http://via.placeholder.com/150.png", nome: "Goiabada", sabores: ["goiaba", "morango"], preco: 6.50, quantidade: 2, precoTotal: 11.20 }]
    //window.localStorage.setItem("user-cart", JSON.stringify(mockup))
    
    const data = window.localStorage.getItem("user-cart")
    const [cartItems, setCartItems] = useState(data ? JSON.parse(data) : [])
    const [isLoading, setIsLoading] = useState(true)
    const [subtotal, setSubtotal] = useState(0)
    const [entrega, setEntrega] = useState(0)
    
    useEffect(() => { setTimeout(() => setIsLoading(false), 600) }, [])
    
    useEffect(() => {
        var subtotal = 0
        cartItems.forEach(item => subtotal += item.precoTotal)
        setSubtotal(subtotal.toFixed(2))

        window.localStorage.setItem("user-cart", JSON.stringify(cartItems))
    }, [cartItems])

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
        const cartItem = findCartItem(id)

        const editedCart = editCartItem(id, "quantidade", cartItem.quantidade + 1)
        editCartItem = editCartItem(id, "precoTotal", +((cartItem.quantidade * cartItem.preco).toFixed(2)))
        
        setCartItems(editedCart)
    }
    
    function decrementQuantity(e) {
        const id = e.target.id
        const cartItem = findCartItem(id)

        if(cartItem.quantidade > 1) {
            const editedCart = editCartItem(id, "quantidade", cartItem.quantidade - 1)
            editCartItem = editCartItem(id, "precoTotal", +((cartItem.quantidade * cartItem.preco).toFixed(2)))

            setCartItems(editedCart)
        }
    }

    function removeCartItem(e) {
        const id = e.target.id ? e.target.id : e.target.parentNode.id
        setCartItems(cartItems.filter(item => item._id != id))
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
                    { isLoading ?
                        <Loading />
                        :
                        cartItems.length ?
                            cartItems.map(cartItem =>
                                <CartItem content={cartItem}
                                    addEvent={addQuantity}
                                    removeEvent={decrementQuantity}
                                    removeItem={removeCartItem} />
                            )
                        :
                        <p className="cart-empty">O carrinho está vazio</p>
                    }
                    </div>
                </div>

                <div className="summary-order">
                    <h1>Resumo do pedido</h1>
                    { isLoading ?
                        <Loading />
                        :
                        <SummaryOrder subtotal={subtotal} entrega={entrega}/>
                    }
                </div>
            </div>
        </>
    )
}

export default Carrinho