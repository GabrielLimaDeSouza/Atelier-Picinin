const mongoose = require('mongoose')

const Avaliacao = mongoose.model('Avaliacao', {
    cliente: String,
    comentario: String,
    nota: Number,
    data: Date
})

module.exports = Avaliacao