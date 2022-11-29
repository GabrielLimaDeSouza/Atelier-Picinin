const mongoose = require('mongoose')

const Pedido = mongoose.model('Pedido', {
    idCliente: String,
    data_entrega: Date,
    cartItems: [],
    address: {},
    total: Number,
    payment: String,
    status: String,
    data: Date
})

module.exports = Pedido