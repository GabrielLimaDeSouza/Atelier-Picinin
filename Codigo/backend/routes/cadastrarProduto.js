const express = require("express");
const router = express.Router();
router.use(express.json());

// Controlers


router.get('/cadastrarProduto', (req, res) => {
    res.json({"message": "Teste da rota do produto"})
})


module.exports = router