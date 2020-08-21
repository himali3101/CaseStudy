const http = require('http');
const app = require('./app')

const port = 3001

const server = http.createServer(app)

server.listen(port, () => {
    console.log("Flight Details service listening to 3001 port");
})