const express = require("express");
const router = express.Router();
router.use(express.json());

// Controlers
const controller = require('../controller/inventoryController')

router.get('/', (req, res) => {
    res.json({"message": "Teste das rotas da api do express"})
})

router.post('/inventoryResgister', controller.inventoryResgister)
module.exports = router