const express = require('express')

const router = express.Router()

const Mail = require("../models/mail.model")


const sendMail = require("../utils/send-mail")


router.post("", async (req, res) => {
    try {

        const mail = await Mail.create(req.body)
        sendMail("abc@server.com", `${mail.email}`, `${mail.subject}`, `${mail.body}`)

        return res.status(201).send({ mail })
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
})


module.exports = router;