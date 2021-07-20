const { port } = require('./config/server_settings.json')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.Server(app)
const io = socketio(server, {
    cors: {
        origin: '*', //CONCERTO DE CORS PARA LOCALHOST
    }
})

const connectedUsers = {}

mongoose.connect('link_mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

io.on('connection', socket => {
    const { user_id } = socket.handshake.query
    connectedUsers[user_id] = socket.id
    // socket.emit('name of socket', data)
    // socket.on('name of socket', data => {
    //     console.log(data)
    // })
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    return next()
})
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))) //pasta upload statica no /files
app.use(routes)

server.listen(port)