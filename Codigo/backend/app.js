const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')

// middlewares para leitura de JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(cors());
app.use(express.json())

// rota inicial
app.get('/', (req, res) => {
    res.json({message: "teste da api com o react"})
})

// Porta do app
const DB_USER = "atelier-picinin"
const DB_PASSWORD = encodeURIComponent("A7B6wTCOKZreWxed")
const DB_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@atelier.unn2ute.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(DB_STRING).then(() => {
    console.log("Banco de dados conectado")
    console.log("Servidor conectado")
    app.listen(3000)
}).catch(err => console.error(err))