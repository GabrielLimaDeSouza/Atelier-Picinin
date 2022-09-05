// Models
const Produto = require('../models/Produto')

module.exports = {
    async viewAllProducts (req, res) {
        try {
            const products = await Produto.find()

            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async registerProduct (req, res) {
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
    }
}