import '../../css/cart/Carrinho.css'

import Cabecalho from '../../../components/layout/CabecalhoCliente'
import Loading from '../../../components/layout/Loading'
import CartItem from '../../../components/cart/modules/CartItem'
import CartItemMobile from '../../../components/cart/modules/CartItemMobile'
import SummaryOrder from '../../../components/cart/modules/SummaryOrder'
import Progression from '../../../components/cart/modules/Progression'
import { useState, useEffect } from 'react'

const Carrinho = () => {
    const mockup = [{ _id: 1111, img: "http://via.placeholder.com/150.png", nome: "Suspiro", sabores: ["sal", "chocolate"], preco: 12.90, quantidade: 6, precoTotal: 77.40 },
    { _id: 2222, img: "http://via.placeholder.com/150.png", nome: "Goiabada", sabores: ["goiaba", "morango", "maça"], preco: 6.50, quantidade: 2, precoTotal: 11.20 },
    { _id: 3333, img: "http://via.placeholder.com/150.png", nome: "Moranguinho", sabores: ["nutella", "wasabi", "gengibre", "tapioca"], preco: 8.95, quantidade: 5, precoTotal: 44.75 },
    { _id: 4444, img: "http://via.placeholder.com/150.png", nome: "Bolo de sorvete", sabores: ["coca-cola", "baunilha", "ervilha"], preco: 15.00, quantidade: 3, precoTotal: 45.00 },
    { _id: 5555, img: "http://via.placeholder.com/150.png", nome: "Doce de Leite", sabores: ["yorgut", "bacalhau"], preco: 24.50, quantidade: 1, precoTotal: 24.50 },
    { _id: 6666, img: "http://via.placeholder.com/150.png", nome: "Petit Gâteau", sabores: ["açucar", "limão", "chocolate", "churrasco"], preco: 18.49, quantidade: 2, precoTotal: 36.98 },
    { _id: 7777, img: "http://via.placeholder.com/150.png", nome: "Mousse de Maracujá", sabores: ["limão", "maracujá", "chocolate", "morango", "tomate"], preco: 5.95, quantidade: 4, precoTotal: 23.80 },
    { _id: 8888, img: "http://via.placeholder.com/150.png", nome: "Brigadeiro", sabores: ["brigadeiro", "bis", "kit-kat"], preco: 3.00, quantidade: 25, precoTotal: 75.00 },
    { _id: 9999, img: "http://via.placeholder.com/150.png", nome: "Pudim", sabores: ["leite", "leite condensado moça", "creme de avelã"], preco: 25.00, quantidade: 1, precoTotal: 25.00 }
]
    window.localStorage.setItem("user-cart", JSON.stringify(mockup))
    
    const data = window.localStorage.getItem("user-cart")
    const [cartItems, setCartItems] = useState(data ? JSON.parse(data) : [])
    const [isLoading, setIsLoading] = useState(true)
    const [subtotal, setSubtotal] = useState(0)
    const [entrega, setEntrega] = useState(0)

    const larguraTela = window.innerWidth
    
    useEffect(() => { setTimeout(() => setIsLoading(false), 600) }, [])
    
    useEffect(() => {
        var subtotal = 0
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
        <>
            <Cabecalho />

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
        </>
    )
}

export default Carrinho