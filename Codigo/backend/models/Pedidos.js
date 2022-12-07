const mongoose = require('mongoose')

const Pedido = mongoose.model('Pedido', {
    idCliente: String,
    nomeCliente: String,
    cartItems: [],
    address: {},
    total: Number,
    entrega: Number,
    payment: String,
    status: String,
    codStatus: String,
    dataEntrega: Date,
    dataPedido: Date
})

module.exports = Pedido