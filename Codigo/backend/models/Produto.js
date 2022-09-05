const mongoose = require('mongoose')

const Produto = mongoose.model('Produto', {
    nomeProduto: String,
    descricaoProduto: String,
    saborProduto: String,
    precoProduto: Number,
    pedidoMinProduto: Number
})

module.exports = Produto

