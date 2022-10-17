// Models
const Usuario = require('../models/Usuario')
const PasswordHash = require('../services/auth')

module.exports = {
    async registerUser(req, res) {
        var { nome, email, senha, admin } = req.body

        if(senha) {
            senha = await PasswordHash.createPasswordHash(senha)
        }

        const user = {
            nome,
            email,
            senha,
            admin
        }

        for (let atributo in user) {
            if (user[atributo] == undefined)
            user[atributo] = null
        }

        try {
            // Criar dados
            await Usuario.create(user)

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

    async getUserLogin(req, res) {
        const { email, password } = req.body
        const user = await Usuario.findOne({ email })

        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado" })
            return
        }

        PasswordHash.checkPassword(user.senha, password).then(passwordCorrect => { 
            if(passwordCorrect) {
                try {
                    res.status(200).json({ accept: true })
                } catch (error) {
                    res.status(500).json({ error: error })
                }
            } else {
                res.status(401).json({ message: "Senha incorreta", accept: false })
            }
        })
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