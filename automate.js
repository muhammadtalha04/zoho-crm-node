var task = {};
const request = require('request');

task.startApp = (port) => {
    request.get({url: "http://127.0.0.1:"+port}, (error, response, body) => {
        console.log('Script started');
    });
}

module.exports = task;