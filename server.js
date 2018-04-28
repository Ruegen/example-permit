const express = require('express')
const {authenticate, login} = require('./auth')
const server = express()



server.post('/login', login, (req, res) => {
    res.json({token: req.token})
})

server.get('/permitted', authenticate, (req, res) => {
    res.json({user: req.user})
})

server.post('/logout', (req, res) => {
    res.json({message: 'logout'})
})

server.use('/',(req, res) => {
    res.send('ok')
})

server.listen(3000, ()=> {
    console.info('server running on port 3000')
})