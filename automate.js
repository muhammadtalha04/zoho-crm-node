const browser = require('zombie');

var task = {};

task.clickAccept = (action = "on") => {
    while (action == "on") {
        browser.visit("http://127.0.0.1:" + port, () => {
            console.log("Process started");
        });
    }
}

task.startProcess = (port) => {

}

module.exports = task;