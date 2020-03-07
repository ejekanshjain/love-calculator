const mongoose = require('mongoose')

const crushSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    crushName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Crushs', crushSchema)