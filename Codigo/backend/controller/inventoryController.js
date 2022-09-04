// Models
const Insumo = require('../models/Insumo')

module.exports = {
    async inventoryResgister(req, res) {
        const { name, quantidadeMin, emEstoque, validade } = req.body

        if(!name){
            res.status(422).json({ error: "Campos obrigatórios" })
        }

        const insumo = {
            name,
            quantidadeMin,
            emEstoque,
            validade,
            status: "OK"
        }

        try {
            // Criar dados
            await Insumo.create(insumo)

            res.status(201).json({ message: "Insumo cadastado com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
 }