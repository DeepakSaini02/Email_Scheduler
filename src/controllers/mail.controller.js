const express = require('express')

const router = express.Router()

const Mail = require("../models/mail.model")

const sendMail = require("../utils/send-mail")


const report = []

function timerConveter(time) {
    let date_time = time.split(",")
    let date = date_time[0].split(" ")
    if (date[0].length == 3)
        only_date = date[0][0]
    else
        only_date = date[0][0] + date[0][1]

    str = `${only_date} ${date[1].trim()} ${date_time[1].trim()} ${date_time[2].trim()}`
    console.log(str);
    let date1 = new Date(str);
    let date2 = new Date()

    if (date2 > date1) {
        return "Not Valid"
    }
    // console.log(date2, date1);
    return Math.abs(date2 - date1);
}



router.post("", async (req, res) => {
    try {
        let time = req.body.time

        const mail = await Mail.create(req.body)

        if (time.includes('now')) {
            sendMail("abc@server.com", `${req.body.email}`, `${req.body.subject}`, `${req.body.body}`)
            report.push({ mail: mail, status: 'success' })
            return res.status(201).send("email send successfully")
        }

        else {
            if (time.includes('hour')) {
                let hour = time.split(" ")
                timer = (+hour[0]) * 60 * 60 * 1000
            }
            else {
                timer = timerConveter(time)
                // console.log(timer);
            }

            if (timer == "Not Valid") {
                report.push({ mail: mail, status: 'failed' })
                return res.status(400).send("invalid time")
            }
            setTimeout(() => {
                sendMail("abc@server.com", `${req.body.email}`, `${req.body.subject}`, `${req.body.body}`)
                report.push({ mail: mail, status: 'success' })
            }, timer)

            return res.status(201).send("schedule")
        }

    } catch (e) {
        report.push({ mail: req.body, status: 'failed' })
        return res.status(500).send({ message: e.message })
    }
})


router.get("", (req, res) => {
    try {
        return res.status(200).send(report)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
})

module.exports = router;