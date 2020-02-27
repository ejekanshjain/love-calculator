require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connected to DB...')
    })
    .catch(err => {
        console.log(err)
    })

module.exports = mongoose.connection