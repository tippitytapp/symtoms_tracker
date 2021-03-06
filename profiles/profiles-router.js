const router = require('express').Router();

const Profiles = require('./profiles-model.js')

const {verifyToken, weAreWe} = require('../auth/auth-middleware.js')

router.use(verifyToken)
router.use(weAreWe)

router.post('/:id/profile', (req, res) => {
    const prof = req.body
    const userId = req.params.id
    const profile={birthday: prof.birthday, conditions: prof.conditions, hospital: prof.hospital, nok_name: prof.nok_name, nok_phone: prof.nok_phone , user_id: userId}
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