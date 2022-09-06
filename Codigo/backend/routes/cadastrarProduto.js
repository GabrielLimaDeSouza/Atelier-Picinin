const express = require("express");
const router = express.Router();
router.use(express.json());
const productController = require('../controller/productController')
// Controlers

router.post('/registerProduct', productController.productRegister)
router.get('/getAllProducts', productController.productGetAll)
router.get('/getProductById/:id', productController.productGetById)
router.put('/updateProduct/:id', productController.updateProduct)
router.delete('/deleteProduct/:id', productController.deleteProduct)

module.exports = router