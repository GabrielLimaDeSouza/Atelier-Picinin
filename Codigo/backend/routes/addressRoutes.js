const express = require("express")
const router = express.Router()
router.use(express.json())

// Controllers
const controller = require('../controller/addressController')

//#region rotas CRUD

// Rotas GET
router.get('/getAllAdresses', controller.getAllAdresses)
router.get('/getAddressById', controller.getAddressByIdClient)

// Rota PATCH
router.patch('/registerAddress', controller.registerAddress)

// Rota DELETE
router.delete('/deleteAddress', controller.deleteAddress)
//#endregion

module.exports = router