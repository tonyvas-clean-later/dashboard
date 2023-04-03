console.clear();

const express = require('express');
const http = require('http');

const DEFAULT_PORT = 8080;
process.env.HTTP_PORT = process.env.HTTP_PORT || DEFAULT_PORT;

let app = express();
let server = http.createServer(app);

server.listen(process.env.HTTP_PORT, () => {
    console.log('HTTP server running!');
})

app.all('*', (request, response, next) => {
    console.log(`${new Date().toLocaleString()} | ${request.method} | ${request.socket.remoteAddress} | ${request.url}`);
    next();
})

app.get('/', (request, response) => {
    response.end('Oi!')
})