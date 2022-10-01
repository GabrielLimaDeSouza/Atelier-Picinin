const mongoose = require('mongoose')

const Avaliacao = mongoose.model('Avaliacao', {
    produto: String,
    cliente: String,
    comentario: String,
    nota: Number,
    data: Date
})

module.exports = Avaliacao

