const express = require("express")
const router = express.Router()
router.use(express.json())

// Controllers
const controller = require('../controller/inventoryController')

//#region rotas CRUD

// Rotas GET
router.get('/viewAllSupplies', controller.viewAllSupplies)
router.get('/viewInputById', controller.viewInputById)

// Rota POST
router.post('/inputRegister', controller.inputRegister)

// Rota PATCH
router.patch('/updateInput', controller.updateInput)

// Rota DELETE
router.delete('/deleteInput', controller.deleteInput)
//#endregion

module.exports = router