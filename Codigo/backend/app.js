// Config
const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const path = require('path')

// Rotas
const inventoryRoutes = require("./routes/inventoryRoutes")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const addressRoutes = require("./routes/addressRoutes")
const ratingRoutes = require("./routes/ratingRoutes") 

// dotEnv
require('dotenv').config()

// middlewares para leitura de  JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../atelier_picinin/public')))

// rotas
app.use('/api', inventoryRoutes)
app.use('/produto', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/address', addressRoutes)
app.use('/rating', ratingRoutes)

// Acesso ao banco de dados
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DB_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@atelier.unn2ute.mongodb.net/bancoAPI?retryWrites=true&w=majority`

// Porta do app
mongoose.connect(DB_STRING).then(() => {
    console.log("Banco de dados conectado\nServidor conectado")
    app.listen(3000)
}).catch(err => console.error(err))