const express = require("express");
const router = express.Router();
router.use(express.json());
const productController = require('../controller/productController')
// Controlers

router.post('/', productController.productRegister)
router.get('/', productController.productGetAll)
router.get('/:id', productController.productGetById)

module.exports = router