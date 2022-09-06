// Models
const Insumo = require('../models/Insumo')

module.exports = {
    async inventoryResgister(req, res) {
        const { name, emEstoque, quantidadeMin, validade } = req.body

        if(!name && !quantidadeMin && !emEstoque){
            res.status(422).json({ errr: "Coampos obrigatórios" })
        }

        const insumo = {
            name,
            quantidadeMin,
            emEstoque,
            validade,
            status: "OK"
        }

        for (let atributo in insumo) {
            if (insumo[atributo] == undefined)
                insumo[atributo] = null;
        }

        try {
            // Criar dados
            await Insumo.create(insumo)

            res.status(201).json({ message: "Insumo cadastado com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async updateInventory (req, res) {
        const id = req.query.id
        const { name, quantidadeMin, emEstoque, validade } = req.body

        const insumo = {
            name,
            quantidadeMin,
            emEstoque,
            validade
        }

        try {
            const updatedInventory = await Insumo.updateOne({ _id: id }, insumo)

            if(updatedInventory.matchedCount === 0){
                res.status(422).json({ message: "Insumo não encontrado" })
                return
            }

            res.status(200).json(insumo)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async viewAllInventory (req, res) {
        try {
            const inventory = await Insumo.find()

            res.status(200).json(inventory)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async viewInventoryById (req, res) {
        const id = req.query.id
        const inventoryById = await Insumo.findById(id)

        if(!inventoryById) {
            res.status(422).json({ message: "Insumo não encontrado" })
            return 
        }

        try {
            res.status(200).json(inventoryById)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async deleteInventory (req, res) {
        const id = req.query.id
        const inventoryById = await Insumo.findById(id)

        if(!inventoryById) {
            res.status(422).json({ message: "Insumo não encontrado" })
            return 
        }

        try {
            await Insumo.deleteOne({ _id: id })

            res.status(200).json({ message: "Insumo apagado com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
 }