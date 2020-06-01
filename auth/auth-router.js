const router = require('express').Router();
const bcryptjs = require('bcryptjs');

const {regObjIsValid, passHash, loginObjIsValid, createToken, verifyToken} = require('./auth-middleware.js')
const Users = require('../users/users-model.js')

router.post('/register', regObjIsValid, (req, res) => {
    const user = req.body;
    const newUser = passHash(user)
    Users.findUserBy({email})
        .then(user => {
            if(user.length > 0){
                res.status(400).json({
                    message: "Email already in use"
                })
            } else {
                Users.addUser(newUser)
                .then(id => {
                    res.status(201).json({
                        message: "User created successfuly"
                    })
                })
                .caatch(error => {
                    res.status(500).json(error)
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post('/login', (req, res) => {
    const [email, password] = req.body;
    if(loginObjIsValid(req.body)){
        Users.findUserBy({email})
            .then(([user]) => {
                if(user && bcryptjs.compareSync(password, user.password)){
                    token = createToken(user)
                    res.status(200).json({
                        message: 'Login successful',
                        token,
                        user
                    })
                } else {
                    res.status(401).json({
                        message: "Invalid credentials"
                    })
                }
            })
            .catch(error => {
                res.status(500).json(error)
            })
    } else {
        res.status(400).json({
            message: 'username or password missing'
        })
    }
})

module.exports = router;