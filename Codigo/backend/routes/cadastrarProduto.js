const express = require("express");
const productsController = require("../controller/productsController");
const router = express.Router();
router.use(express.json());

const controller = require('../controller/productsController')

// Controlers
router.post('/produto', productsController.registerProduct)

router.get('/viewAllProducts', productsController.viewAllProducts)
module.exports = router