const express = require("express");
const router = express.Router();
router.use(express.json());
const Produto = require('../models/Produto')
// Controlers

router.post('/produto', async (req, res) => {
    
    const{nomeProduto, descricaoProduto} = req.body
    
    const produto = {
        nomeProduto,
        descricaoProduto
    }

    try{

        await Produto.create(produto)

        res.status(201).json({message: 'Produto cadastrado'})

    }catch(error){
        res.status(500).json({error: error})
    }
})


module.exports = router