const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');

const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
	var api_url = "https://www.zohoapis.com/crm/v2/settings/modules";
	var headers = {
		'Authorization': 'Zoho-oauthtoken 1000.51c2a4b7589aacd739c5116d342a229c.f1884131907c1ec2ee71a57ef2845a68'
	};

	request.get({ url: api_url, headers: headers }, (error, response, body) => {
		res.send(body);
	});
});

app.get('/leads', (req, res) => {
	var url = 'https://www.zohoapis.com/crm/v2/leads';
	var headers = {
		'Authorization': 'Zoho-oauthtoken 1000.068a8578bce58f40d9fea10f7696a085.649871a4b93a4a6b3c32b646281d96af'
	};

	request.get({ url: url, headers: headers }, (error, response, body) => {
		res.send(body);
	});
});


app.get('/leads/create', (req, res) => {
	var url = 'https://www.zohoapis.com/crm/v2/leads';
	var headers = {
		'Authorization': 'Zoho-oauthtoken 1000.4a53d79864e8627f93dfa926e3447fa7.9efef43ac6e3525cd4f8d7af74f3c0e8',
		// 'content-type': 'application/json'
	};
	var bodyData = {
		"data": [
			{
				"Company": "E-Corp",
				"Last_Name": "Eliot Jr",
				"First_Name": "Anderson",
				"Email": "example@test.com",
			}
		],
		"trigger": [
			"approval",
			"workflow",
			"blueprint"
		]
	};

	request.post({ url: url, headers: headers, body: bodyData, json: true }, (error, response, body) => {
		// console.send(response);
		res.send(body);
	});
});

app.get('/token', (req, res) => {
	// const conf = {
	// 	'client_id': '1000.TYJQWU1M0H6Z5RL7QHC9R5S2JUK8WY',
	// 	'client_secret': '5688c24c6d418dfb7d511780763522aba82431e848',
	// 	'redirect_uri': 'http://127.0.0.1:3000',
	// 	'scope': 'ZohoCRM.modules.ALL'
	// };

	// var url = "https://accounts.zoho.com/oauth/v2/auth?scope=" + conf.scope + "&client_id=" + conf.client_id + "&response_type=code&access_type=offline&redirect_uri=" + conf.redirect_uri;
	// var url="https://accounts.zoho.com/oauth/v2/token";
	var body = {
		'grant_type': 'authorization_code',
		'client_id': '1000.L5SDOBSTN82CB7DI0MVKFOF5XAKDER',
		'client_secret': '092b9f2a48ab592d2824f3583f6d0863fab81d7ab6',
		'redirect_uri': 'https://www.getpostman.com/oauth2/callback',
		'code': '1000.c201b0105ff37caca0f23762bf1bc620.5549e2f44221fb32e7d5dc2bbf9721af'
	};

	const headers = {
		'content-length': Object.keys(body).length
	};

	// console.log(Object.keys(body).length);
	request.post({ url: url, form: body }, (error, response, body) => {
		// res.set(err);
		res.send(response);
		res.send("<br><br><br>BODY<br>" + body);
	});
});


app.listen(PORT, () => console.log(`Express server currently running on port http://127.0.0.1:${PORT}`));