const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const AuthRouter = require('../auth/auth-router.js')
const UsersRouter = require('../users/users-router.js')
const ProfilesRouter = require('../profiles/profiles-router.js')
const server = express();
server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/auth', AuthRouter)
server.use('/users', UsersRouter)
server.use('/users', ProfilesRouter)

server.get('/', (req, res) => {
    res.status().json({
        api: "API is online"
    })
})

module.exports = server;