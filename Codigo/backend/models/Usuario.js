const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    senha: String,
    endereco: [{
        idAddress: String,
        rua: String,
        cep: Number,
        bairro: String,
        cidade: String,
        complemento: String,
        numero: Number,
        estado: String
    }]
})

module.exports = Usuario