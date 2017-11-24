const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(bodyParser())

app.get('/:startDate/:endDate', (req,res) => {

    let startDate = req.params.startDate
    let endDate = req.params.endDate

    let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + startDate + '&end=' + endDate
    axios.get(url)
        .then(response => {
            data = Object.values(response.data.bpi)
            res.send(data)
        })
})


app.listen(8080, () => {
    console.log('Listening on Port 8080')
});