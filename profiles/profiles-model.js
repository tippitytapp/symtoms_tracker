const db = require('../server/dbConfig.js')


// create a user profile
function addUserProfile(profile){
    return db('profiles')
            .insert(profile, "id")
}


// get profile by user id
function getProfileByUserId(id){
    return db('profiles')
            .where('user_id', id)
}

module.exports={
    addUserProfile,
    getProfileByUserId
}