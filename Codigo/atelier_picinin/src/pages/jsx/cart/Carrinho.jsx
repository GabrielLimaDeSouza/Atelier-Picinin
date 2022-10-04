import '../../css/cart/Carrinho.css'

import Loading from '../../../components/layout/Loading'
import CartItem from '../../../components/cart/modules/CartItem'
import CartItemMobile from '../../../components/cart/modules/CartItemMobile'
import SummaryOrder from '../../../components/cart/modules/SummaryOrder'
import Progression from '../../../components/cart/modules/Progression'
import { useState, useEffect } from 'react'

const Carrinho = () => {
    const data = window.localStorage.getItem("user-cart")
    const [cartItems, setCartItems] = useState(data ? JSON.parse(data) : [])
    const [isLoading, setIsLoading] = useState(true)
    const [subtotal, setSubtotal] = useState(0)
    const [entrega, setEntrega] = useState(0)

    const larguraTela = window.innerWidth
    
    useEffect(() => { setTimeout(() => setIsLoading(false), 600) }, [])
    
    useEffect(() => {
        var subtotal = 0
        console.log(cartItems)
        cartItems.forEach(item => subtotal += item.precoTotal)
        setSubtotal(subtotal.toFixed(2))

        window.localStorage.setItem("user-cart", JSON.stringify(cartItems))
    }, [cartItems])

    function editCartItem(array, id, attribute, value) {
        const cartItemUpdated = array.reduce((acc, o) => {
            let obj = (id == o._id) ? Object.assign(o, o[attribute] = value) : o
            acc.push(obj)
            return acc
        }, [])

        return cartItemUpdated
    }

    function handleEditQuantity(item, className) {
        const id = item._id
        let editedCart

        switch(className) {
            case "add-quantity":
                editedCart = editCartItem(cartItems, id, "quantidade", item.quantidade + 1)

                break
        
            case "remove-quantity":
                editedCart = (item.quantidade > 1) && editCartItem(cartItems, id, "quantidade", item.quantidade - 1)

                break
            
            case "remove-button":
                editedCart = cartItems.filter(item => item._id != id)
                
                break
        }
        
        editedCart = editCartItem(editedCart, id, "precoTotal", +((item.quantidade * item.preco).toFixed(2)))
        setCartItems(editedCart)
    }

    function handleDropdownMenu() {
        const summary = document.querySelector('div.summary-order')
        summary.classList.toggle('active')

        const summaryContent = document.querySelector('div.summaryContent')

        !summaryContent.classList.contains('hidden') ?
            summaryContent.classList.remove('hidden')
        :
            setTimeout(() => summaryContent.classList.add('hidden'), 300)
    }

    return (
        <div className="body-cart">
            <div className="cart-content">
                <div className="title-page">
                    <h1 className="logo">Logo</h1>
                    <span>|</span>
                    <Progression state="Carrinho de Compra" elements={ ["Carrinho de Compra", "Endereço", "Confirmar Pedido"] } />
                </div>

                <div className="cart-items">
                { isLoading ?
                    <Loading />
                    :
                    cartItems.length ?
                        larguraTela >= 600 ?
                            cartItems.map( cartItem => <CartItem content={cartItem} handleEditCart={handleEditQuantity} /> )
                        :
                            cartItems.map( cartItem => <CartItemMobile content={cartItem} handleEditCart={handleEditQuantity} /> )
                    :        
                        <p className="cart-empty">O carrinho está vazio</p>
                }
                </div>
            </div>

            <div className="summary-order">
                <button type="button" className="dropdown" onClick={handleDropdownMenu}><div className="line"></div></button>
                
                <div className="summaryContent">
                    <h1>Resumo do pedido</h1>
                    { isLoading ?
                        <Loading />
                        :
                        <SummaryOrder subtotal={subtotal} entrega={entrega} linkTo="/adicionarEndereco" textLinkTo="Escolher Endereço"/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Carrinho