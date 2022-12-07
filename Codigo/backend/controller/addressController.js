// Models
const Usuario = require('../models/Usuario')

var mongoObjectId = () => {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

module.exports = {
    async registerAddress(req, res) {
        const id = req.query.id
        const { rua, cep, bairro, cidade, complemento, numero, estado } = req.body
        const idAddress = mongoObjectId()

        const endereco = {
            idAddress,
            rua,
            cep,
            bairro,
            cidade,
            complemento,
            numero,
            estado
        }

        for (let atributo in endereco) {
            if (endereco[atributo] == undefined)
                endereco[atributo] = null
        }

        const user = await Usuario.findById(id)
        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado" })
            return
        }

        user.endereco.push(endereco)

        try {
            // Criar dados
            await Usuario.updateOne({ _id: id }, user)

            res.status(201).json(endereco)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async getAllAdresses(req, res) {
        try {
            const users = await Usuario.find()

            const adresses = users.map(user => user.endereco)

            res.status(200).json(adresses)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async getAddressByIdClient(req, res) {
        const id = req.query.id
        const user = await Usuario.findById(id)

        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado" })
            return
        }

        try {
            res.status(200).json(user.endereco)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async deleteAddress(req, res) {
        const id = req.query.id
        const idAddress = req.query.address
        const user = await Usuario.findById(id)

        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado" })
            return
        }

        try {
            await Usuario.updateOne({ _id: id }, { endereco: [{ $unset: { idAddress: idAddress } }] })

            res.status(200).json({ message: "Usuário apagado com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}