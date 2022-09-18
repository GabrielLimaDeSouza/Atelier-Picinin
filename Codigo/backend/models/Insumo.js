const mongoose = require('mongoose')

const Insumo = mongoose.model('Insumo', {
    name: String,
    quantidadeMin: Number,
    emEstoque: Number,
    validade: Date,
    status: String,
    categoria: String
})

module.exports = Insumo