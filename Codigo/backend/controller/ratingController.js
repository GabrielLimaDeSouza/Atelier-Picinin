// Models
const Avaliacao = require('../models/Avaliacao')

module.exports = {
    async ratingRegister(req, res) {
        const { produto, cliente, comentario, nota, data } = req.body

        if (!comentario && !nota) {
            res.status(422).json({ err: "Campos obrigatórios" })
        }

        const avaliacao = {
            produto,
            cliente,
            comentario,
            nota,
            data
        }

        try {
            // Criar dados
            await Avaliacao.create(avaliacao)

            res.status(201).json({ message: "Avaliacao cadastrada com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async  updateRating(req, res) {
        const id = req.query.id
        const { produto, cliente, comentario, nota, data } = req.body

        const avaliacao = {
            produto,
            cliente,
            comentario,
            nota,
            data
        }

        try {
            const updatedRating = await Avaliacao.updateOne({ _id: id }, avaliacao)

            if (updatedRating.matchedCount === 0) {
                res.status(422).json({ message: "Avaliação não encontrado" })
                return
            }

            res.status(200).json(avaliacao)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async viewAllRatings(req, res) {
        try {
            const ratings = await Avaliacao.find()

            res.status(200).json(ratings)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async viewRatingById(req, res) {
        const id = req.query.id
        const inputById = await Avaliacao.findById(id)

        if (!inputById) {
            res.status(422).json({ message: "Avaliação não encontrada" })
            return
        }

        try {
            res.status(200).json(inputById)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    
    async deleteRating(req, res) {
        const id = req.query.id
        const inputById = await Avaliacao.findById(id)

        if (!inputById) {
            res.status(422).json({ message: "Avaliação não encontrada" })
            return
        }

        try {
            await Avaliacao.deleteOne({ _id: id })

            res.status(200).json({ message: "Avaliação apagada com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}