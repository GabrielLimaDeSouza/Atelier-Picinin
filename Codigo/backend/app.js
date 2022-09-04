const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const apiRoutes = require("./routes/apiRoutes")
const cadastrarProdutoRoute = require ("./routes/cadastrarProduto")

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
app.use('/cadastrarProduto', cadastrarProdutoRoute);
// Porta do app
const DB_USER = "atelier-picinin"
const DB_PASSWORD = encodeURIComponent("A7B6wTCOKZreWxed")
const DB_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@atelier.unn2ute.mongodb.net/bancoAPI?retryWrites=true&w=majority`

mongoose.connect(DB_STRING).then(() => {
    console.log("Banco de dados conectado")
    console.log("Servidor conectado")
    app.listen(3000)
}).catch(err => console.error(err))