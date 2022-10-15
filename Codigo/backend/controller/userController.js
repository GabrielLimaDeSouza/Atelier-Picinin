// Models
const Usuario = require('../models/Usuario')

module.exports = {
    async registerUser(req, res) {
        const { nome, email, senha, admin } = req.body

        const insumo = {
            nome,
            email,
            senha,
            admin
        }

        for (let atributo in insumo) {
            if (insumo[atributo] == undefined)
                insumo[atributo] = null
        }

        try {
            // Criar dados
            await Usuario.create(insumo)

            res.status(201).json({ message: "Usuário cadastado com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async updateUser(req, res) {
        const id = req.query.id
        const { nome, email, senha } = req.body

        const user = {
            nome,
            email,
            senha,
        }

        try {
            const updateUser = await Usuario.updateOne({ _id: id }, user)

            if (updateUser.matchedCount === 0) {
                res.status(422).json({ message: "Usuário não encontrado" })
                return
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await Usuario.find()

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async getUserById(req, res) {
        const id = req.query.id
        const inputById = await Usuario.findById(id)

        if (!inputById) {
            res.status(422).json({ message: "Usuário não encontrado" })
            return
        }

        try {
            res.status(200).json(inputById)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async deleteUser(req, res) {
        const id = req.query.id
        const user = await Usuario.findById(id)

        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado" })
            return
        }

        try {
            await Usuario.deleteOne({ _id: id })

            res.status(200).json({ message: "Usuário apagado com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}