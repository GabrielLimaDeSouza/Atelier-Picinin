const express = require("express");
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    res.json({"message": "Teste das rotas da api do express"})
})

module.exports = router