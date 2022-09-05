const mongoose = require('mongoose')
const Sabor = mongoose.model('Sabor', {
    nomeProduto: String,
    sabor: String
})

module.exports = Sabor

