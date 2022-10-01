const mongoose = require('mongoose')

const Sabores = mongoose.model('Sabores', {
    idProduto: String,
    nomeProduto: String,
    saborProduto: String,
    precoProduto: Number
    
})

module.exports = Sabores

