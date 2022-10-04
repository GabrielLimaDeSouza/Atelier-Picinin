const mongoose = require('mongoose')

const Produto = mongoose.model('Produto', {
    nomeProduto: String,
    descricaoProduto: String,
    pedidoMinProduto: Number,
    preco: Number,
    foto1: String,
    foto2: String,
    foto3: String,
    sabores: [{ sabor: String, preco: Number}]
})

module.exports = Produto

