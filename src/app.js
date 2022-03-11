const express = require('express')

const app = express()
const connect = require('./configs/db')
const mailController = require("./controllers/mail.controller")
app.use(express.json())


app.use('/sendmail', mailController)

app.listen(6060, () => {
    connect()
    console.log('listening on port 6060')

})