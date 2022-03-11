const mongoose = require('mongoose')

const mailSchema = new mongoose.Schema({


    email: { type: String, required: true },
    time: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },

}, {
    versionKey: false,
    timestamps: true
})


module.exports = mongoose.model("mail", mailSchema)