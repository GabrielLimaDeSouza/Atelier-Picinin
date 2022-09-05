const express = require("express");
const router = express.Router();
router.use(express.json());

// Controllers
const controller = require('../controller/inventoryController')


router.get('/', (req, res) => {
    res.json({"message": "Teste das rotas da api do express"})
})

//#region rotas CRUD

// Rotas GET
router.get('/viewAllInventory', controller.viewAllInventory)
router.get('/viewInventoryById', controller.viewInventoryById)

// Rota POST
router.post('/inventoryResgister', controller.inventoryResgister)

// Rota PATCH
router.patch('/updateInventory', controller.updateInventory)

// Rota DELETE
router.delete('/deleteInventory', controller.deleteInventory)
//#endregion

module.exports = router