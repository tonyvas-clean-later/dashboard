console.clear();

const express = require('express');
const http = require('http');
const fs = require('fs');

const DEFAULT_PORT = 8080;
const CONFIG_PATH = `${__dirname}/config.json`

process.env.HTTP_PORT = process.env.HTTP_PORT || DEFAULT_PORT;

let app = express();
let server = http.createServer(app);

app.set('view engine', 'ejs');

server.listen(process.env.HTTP_PORT, () => {
    console.log('HTTP server running!');
})

app.all('*', (request, response, next) => {
    console.log(`${new Date().toLocaleString()} | ${request.method} | ${request.socket.remoteAddress} | ${request.url}`);
    next();
})

app.get('/', (request, response) => {
    getConfig().then(config => {
        response.render('home', {config});
    }).catch(error => {
        response.render('500', {error});
    })
})

app.get('*', (request, response) => {
    response.render('404', {url: request.url});
})

function getConfig(){
    return new Promise((resolve, reject) => {
        fs.readFile(CONFIG_PATH, 'utf-8', (err, data) => {
            if (err){
                reject(err)
            }
            else{
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(new Error('Failed to parse config json'))
                }
            }
        })
    })
}