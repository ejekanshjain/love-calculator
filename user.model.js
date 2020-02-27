const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Users', User)