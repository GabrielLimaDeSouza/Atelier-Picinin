const mongoose = require('mongoose')

const Insumo = mongoose.model('Insumo', {
    idInsumo: Number,
    nome: String,
    quantidadeMin: Number,
    emEstoque: Number,
    validade: Date,
    status: String
})

module.exports = Insumo