const server = require('./server/server.js')
const colors = require('colors');
require('dotenv').config();

const environment = process.env.NODE_ENV;
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n === Server Listening in ${environment} on localhost:${port} === \n`)
})