const express = require("express");
const router = express.Router();
router.use(express.json());
const Produto = require('../models/Produto');
const Sabor = require('../models/Sabor');

module.exports = {

    async productRegister(req, res){

        const descricaoProduto = req.body.descricao
        const nomeProduto = req.body.nome
        const saborProduto = req.body.sabor
        const precoProduto = req.body.preco
        const pedidoMinProduto = req.body.pedidoMinProduto


        if(!nomeProduto && !descricaoProduto && !saborProduto && !precoProduto && !pedidoMinProduto){
            res.status(422).json({ error: "Campos obrigatórios" })
            return
        }
        const produto = {
            nomeProduto,
            descricaoProduto,
            saborProduto,
            precoProduto,
            pedidoMinProduto
        }

        console.log(produto)
        try{
    
            await Produto.create(produto)
            res.status(201).json({message: 'Produto cadastrado'})
    
        }catch(error){
            res.status(500).json({error: error})
        }

    },
    
    async productGetAll(req, res){
    
        try{
            
            const produtos = await Produto.find()
            
            
            res.status(200).json(produtos)
            
        }catch(error){
            res.status(500).json({error: error})
        }

    },

    async productGetById(req,res){
        try{
            const id = req.params.id
            const produtoEspecifico = await Produto.findById(id)
            res.status(200).json(produtoEspecifico)
            
        }catch(error){
            res.status(500).json({error: error})
        }
    }


}