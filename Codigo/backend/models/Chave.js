const mongoose = require('mongoose')

const Chave = mongoose.model('Chave', {
    chave: String
})

module.exports = Chave