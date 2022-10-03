const express = require("express");
const router = express.Router();
router.use(express.json());
const productController = require('../controller/productController')
// Controlers

router.post('/registerProduct', productController.productRegister)
router.get('/getAllProducts', productController.productGetAll)
router.get('/getAllSabores', productController.saboresGetAll)
router.get('/getProductById/:id', productController.productGetById)
router.patch('/updateProduct/:id', productController.updateProduct)
router.patch('/updateSabor/:id', productController.updateSabor)
router.patch('/createSabor/:id', productController.createSabor)
router.patch('/deleteSabor/:id', productController.deleteSabor)
router.delete('/deleteProduct/:id', productController.deleteProduct)

module.exports = router