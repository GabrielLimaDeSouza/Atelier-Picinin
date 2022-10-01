const express = require("express")
const router = express.Router()
router.use(express.json())

// Controllers
const controller = require('../controller/ratingController')

//#region rotas CRUD

// Rotas GET
router.get('/viewAllRatings', controller.viewAllRatings)
router.get('/viewRatingById', controller.viewRatingById)

// Rota POST
router.post('/ratingRegister', controller.ratingRegister)

// Rota PATCH
router.patch('/updateRating', controller.updateRating)

// Rota DELETE
router.delete('/deleteRating', controller.deleteRating)
//#endregion

module.exports = router