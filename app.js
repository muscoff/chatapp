const http = require('http')
const express = require('express')
const app = express()
const path = require('path')
const {Server} = require('socket.io')

const port = process.env.PORT || 3000

const server = http.createServer(app)
const io = new Server(server)

app.use('/', require('./route/index'))

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket=>{
    console.log('connected to backend')

    socket.on('greetings', ()=>{
        // io.emit('greetings', 'Hello')
        socket.broadcast.emit('greetings', 'hi')
    })

    socket.on('send-msg', msg=>{
        socket.broadcast.emit('receive-msg', msg)
    })
})

server.listen(port)