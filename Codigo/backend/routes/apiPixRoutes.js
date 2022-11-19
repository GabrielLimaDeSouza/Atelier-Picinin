const express = require("express")
const router = express.Router()
const GNRequest = require("../services/apiGerencianet")

const reqGNAlready = GNRequest({
    clientID: process.env.GN_CLIENT_ID,
    clientSecret: process.env.GN_CLIENT_SECRET
})

router.post('/', async (req, res) => {
    const { valor, message } = req.body
    const chavePix = process.env.GN_CHAVE_PIX

    const reqGN = await reqGNAlready

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

    const cobResponse = await reqGN.post('/v2/cob', dataCob)
    const qrCodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)

    res.send(qrCodeResponse.data)
})

router.post('/webhook(/pix)?', (req, res) => {
    console.log(req.body)
    res.send('200')
})
//#endregion

module.exports = router