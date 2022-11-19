const express = require("express")
const router = express.Router()
const path = require('path')
const axios = require('axios')
const fs = require('fs')
const https = require('https')

router.use(express.json())

if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const cert = fs.readFileSync(
    path.resolve(__dirname, `../certs/${process.env.GN_CERT}`)
)

const agent = new https.Agent({
    pfx: cert,
    passphrase: ''
})

const credentials = Buffer.from(
    `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
).toString('base64')

router.post('/', (req, res) => {
    const { valor, message } = req.body
    const chavePix = process.env.GN_CHAVE_PIX

    axios({
        method: 'POST',
        url: `${process.env.GN_ENDPOINT}/oauth/token`,
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        data: {
            grant_type: 'client_credentials'
        }
    }).then((resp) => {
        const accessToken = resp.data?.access_token
    
        const reqGN = axios.create({
            baseURL: process.env.GN_ENDPOINT,
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
    
        const dataCob = {
            calendario: {
                expiracao: 3600
            },
            valor: {
                original: valor
            },
            chave: chavePix,
            solicitacaoPagador: message
        }
    
        reqGN.post('/v2/cob', dataCob).then(resp => res.send(resp.data))
    })
})

//#endregion

module.exports = router