const express = require("express")
const router = express.Router()
router.use(express.json())

// Controllers
const controller = require('../controller/orderController')

//#region rotas CRUD

// Rotas GET
router.get('/getAllOrders', controller.getAllOrders)
router.get('/getOrderById', controller.getOrderByIdClient)

// Rota POST
router.post('/createOrder', controller.createOrder)

// Rota PATCH
router.patch('/updateOrder', controller.updateOrder)

// Rota DELETE
router.delete('/deleteOrder', controller.deleteOrder)
//#endregion

module.exports = router