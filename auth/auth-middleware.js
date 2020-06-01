const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const secrets = require('./auth-secrets');

// verify user registration object is complete before register
function regObjIsValid(req, res, next){
    const user = req.body;
    if(!user){
        res.status(400).json({
            message: "All fields are required for registration"
        })
    } else if(!user.name || !user.email || !user.password || !user.age){
        res.status(400).json({
            message: "All fields are required for registration"
        })
    } else if(Boolean(user.terms === false)){
        res.status(400).json({
            message: "You must accept to the terms and conditions for use "
        })
    } else {
        next();
    }
}

// create a hashed password on registration
function passHash(info){
    const user = info
    const hash = bcryptjs.hashSync(user.password, 12)
    user.password = hash;
    return user
}

// verify user login object is complete before login
function loginObjIsValid(user){
    return Boolean(
        user.email &&
        user.password &&
        typeof user.password === 'string'
    )
}

// create token on login
function createToken(user){
    const payload = {
        sub: user.id,
        name: user.name
    }
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

// verify token prior to accessing any resources
function verifyToken(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decToken) => {
            if(err){
                res.status(401).json({
                    message: "Invalid credentials received from client."
                })
            }else{
                req.jwt = decToken;
                next();
            }
        })
    } else {
        res.status(401).json({
            message: "Error validating credentials, please try again."
        })
    }
}

module.exports={
    regObjIsValid,
    passHash,
    loginObjIsValid,
    createToken,
    verifyToken
}