const express = require('express');
const app = express();
const cors = require("cors");

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
app.listen(3000)