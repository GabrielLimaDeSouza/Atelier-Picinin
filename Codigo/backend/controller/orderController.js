// Models
const Pedidos = require('../models/Pedidos')

module.exports = {
    async createOrder(req, res) {
        const { idCliente, cartItems, address, total, payment, status } = req.body

        var totalFloat = parseFloat(total)

        const order = {
            idCliente,
            cartItems,
            address,
            total: totalFloat,
            payment,
            status
        }

        const orderRegisted = await Pedidos.findOne({ idCliente: idCliente }, { "_id": 0, "__v": 0 })

        if(JSON.stringify(orderRegisted) === JSON.stringify(order)) {
            res.status(422).json({ message: "Pedido já existe" })
            return
        }

        try {
            // Criar dados
            await Pedidos.create(order)

            res.status(201).json(order)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async getAllOrders(req, res) {
        try {
            const orders = await Pedidos.find()

            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async getOrderById(req, res) {
        const id = req.query.id
        const order = await Pedidos.findById(id)

        if (!order) {
            res.status(422).json({ message: "Pedido não encontrado" })
            return
        }

        try {
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async updateOrder(req, res) {
        const id = req.query.id
        const { idCliente, cartItems, address, total, payment, status } = req.body

        const order = {
            idCliente,
            cartItems,
            address,
            total,
            payment,
            status
        }

        try {
            const orderUpdated = await Pedidos.updateOne({ _id: id }, order)

            if (orderUpdated.matchedCount === 0) {
                res.status(422).json({ message: "Pedido não encontrado" })
                return
            }

            res.status(200).json(order)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async deleteOrder(req, res) {
        const id = req.query.id
        const order = await Pedidos.findById(id)

        if (!order) {
            res.status(422).json({ message: "Pedido não encontrado" })
            return
        }

        try {
            await Pedidos.deleteOne({ _id: id })

            res.status(200).json({ message: "Pedido apagado com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}