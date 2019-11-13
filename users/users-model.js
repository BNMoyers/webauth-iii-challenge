//import
const db = require("../data/dbConfig");

//export
module.exports = {
    find,
    findById,
    findBy,
    add,
}

//helper functions

function find(){
    return db('users').select('id', 'username', 'password');
}

function findById(id) {
    return db('users')
             .where({ id })
}

function findBy(filter) {
    return db('users').where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}