const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const apiRoutes = require("./routes/apiRoutes")
const cadastrarProdutoRoute = require ("./routes/cadastrarProduto")
require('dotenv').config()

// middlewares para leitura de JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors());
app.use(express.json())

// rotas
app.use('/api', apiRoutes);
app.use('/produto', cadastrarProdutoRoute);

// Acesso ao banco de dados
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DB_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@atelier.unn2ute.mongodb.net/bancoAPI?retryWrites=true&w=majority`

// Porta do app
mongoose.connect(DB_STRING).then(() => {
    console.log("Banco de dados conectado")
    console.log("Servidor conectado")
    app.listen(3000)
}).catch(err => console.error(err))