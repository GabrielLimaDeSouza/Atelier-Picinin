const express = require("express");
const router = express.Router();
router.use(express.json());

// Controllers
const controller = require('../controller/userController')

//#region rotas CRUD

// Rotas GET
router.get('/getAllUsers', controller.getAllUsers)
router.get('/getUserById', controller.getUserById)

// Rota POST
router.post('/registerUser', controller.registerUser)

// Rota PATCH
router.patch('/updateUser', controller.updateUser)

// Rota DELETE
router.delete('/deleteUser', controller.deleteUser)
//#endregion

module.exports = router