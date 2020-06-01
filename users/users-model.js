const db = require('../server/dbConfig.js')

// get all users
function getAll(){
    return db('users')
}

// get a user by ID
function getUserById(id){
    return db('users')
            .where({id})
            .first()
}

// add a user
function addUser(user){
    return db('users')
            .insert(user, 'id')
}

// find user by filter
function findUserBy(filter){
    return db('users')
            .where(filter)
}

// update a user
function updateUser(user){
    return db('users')
            .where({id: user.id})
            .update(user, 'id')
}

module.exports = {
    getAll,
    getUserById,
    addUser,
    findUserBy,
    updateUser
}