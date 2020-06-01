const router = require('express').Router()

const Users = require('./users-model.js')

const {verifyToken, iAmMe, passHash} = require('../auth//auth-middleware.js')

router.use(verifyToken)

// Get all users
router.get('/', (req, res) => {
    Users.getAll()
    .then(users => {
        res.status(200).json(users)
    })
})

// update your user info
router.put('/:id', iAmMe, (req, res) => {
    const user = req.body
    const id = req.jwt.sub
    const newPass = passHash(user)
    const newUser = {...user, password: newPass.password, id:id}
        Users.updateUser(newUser)
        .then(count => {
            Users.getUserById(req.params.id)
            .then(user => {
                res.status(200).json(user)
            })
        })
})

module.exports=router;