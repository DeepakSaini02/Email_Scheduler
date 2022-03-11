const express = require('express')

const app = express()
const connect = require('./configs/db')
app.use(express.json())




app.listen(6060, () => {
    connect()
    console.log('listening on port 6060')

})