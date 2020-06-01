const router = require('express').Router();

const Profiles = require('./profiles-model.js')

const {verifyToken, weAreWe} = require('../auth/auth-middleware.js')

router.use(verifyToken)
router.use(weAreWe)

router.post('/:id/profile', (req, res) => {
    const profile = req.body
    Profiles.addUserProfile(profile)
        .then(respo => {
            res.status(201).json({
                message: "profile created successfully"
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/:id/profile', (req, res) => {
    const id = req.params.id
    Profiles.getProfileByUserId(id)
        .then(profile => {
            res.status(200).json(profile)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router;