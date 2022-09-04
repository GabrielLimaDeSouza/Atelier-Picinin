const mongoose = require('mongoose')

const Produto = mongoose.model('Produto', {
    nomeProduto: String,
    descricaoProduto: String,
})

module.exports = Produto

