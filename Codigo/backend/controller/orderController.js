// Models
const Pedidos = require('../models/Pedidos')

module.exports = {
    async createOrder(req, res) {
        const { idCliente, nomeCliente, cartItems, address, total, payment } = req.body

        var totalFloat = parseFloat(total)
        const dataPedido = new Date().toISOString()
        const dataEntregaManipulation = new Date()
        dataEntregaManipulation.setDate(dataEntregaManipulation.getDate() + 10)
        let dataEntrega = dataEntregaManipulation.toDateString()

        const order = {
            idCliente,
            nomeCliente,
            cartItems,
            address,
            total: totalFloat,
            payment,
            status: "Pagamento pendente",
            codStatus: "status-0",
            entrega: 0,
            dataPedido,
            dataEntrega
        }

        try {
            // Criar dados
            await Pedidos.create(order)

            res.status(201).json(order)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    },

    async getAllOrders(req, res) {
        try {
            const orders = await Pedidos.find()

            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    },

    async getOrderByIdClient(req, res) {
        const id = req.query.id
        const orders = await Pedidos.find({ idCliente: id})

        if (!orders) {
            res.status(422).json({ message: "Pedido não encontrado" })
            return
        }

        try {
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    },

    async updateOrder(req, res) {
        const id = req.query.id
        const { cartItems, address, total, payment, codStatus, status, entrega } = req.body

        const order = {
            cartItems,
            address,
            total,
            payment,
            status,
            codStatus,
            entrega
        }

        try {
            const orderUpdated = await Pedidos.updateOne({ _id: id }, order)

            if (orderUpdated.matchedCount === 0) {
                res.status(422).json({ message: "Pedido não encontrado" })
                return
            }

            res.status(200).json(order)
        } catch (err) {
            res.status(500).json({ error: err })
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
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }
}