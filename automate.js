const puppeteer = require('puppeteer');
const credentials = require('./resources/client_credentials')

var task = {};

task.startApp = (port) => {
    (async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

        await page.goto("http://127.0.0.1:" + port);
        
        await page.waitForSelector("#login_id")
		await page.type('#login_id', credentials.email)
		await page.click('#nextbtn')

		await page.waitForSelector('#password')
		await page.type('#password', credentials.password)
		await page.click('#nextbtn > span')

		await page.waitForSelector('#Approve_Reject')
		await page.click('.btn')
	});
}

module.exports = task;