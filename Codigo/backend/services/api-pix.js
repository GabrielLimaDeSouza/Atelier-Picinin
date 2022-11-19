const path = require('path')
const axios = require('axios')
const fs = require('fs')
const https = require('https')

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
}).then((res) => {
    const accessToken = res.data?.access_token
    const endpoint = `${process.env.GN_ENDPOINT}/v2/cob`
    const dataCob = {
    calendario: {
            expiracao: 3600
        },
        valor: {
            original: 100.00
        },
        chave: '31999532003',
        solicitacaoPagador: "Cobrança dos serciços prestados"
    }

    const config = {
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${credentials}`,
            'Content-Type': 'application/json'
        }
    }

    axios.post(endpoint, dataCob, config).then(console.log)
})