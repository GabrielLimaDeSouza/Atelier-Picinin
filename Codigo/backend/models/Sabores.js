const mongoose = require('mongoose')

const Sabores = mongoose.model('Sabores', {
    nomeProduto: String,
    saborProduto: String,
    precoProduto: Number
})

module.exports = Sabores

