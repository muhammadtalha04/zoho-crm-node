const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');

const PORT = 3000;

app.use(cors());
// app.use((req, res, next) => {
// 	res.append('Authorization', 'Zoho-oauthtoken 1000.51c2a4b7589aacd739c5116d342a229c.f1884131907c1ec2ee71a57ef2845a68');
// 	next();
// });

app.get('/', (req, res) => {
	var api_url = "https://www.zohoapis.com/crm/v2/settings/modules";
	var headers = {
		'Authorization': 'Zoho-oauthtoken 1000.51c2a4b7589aacd739c5116d342a229c.f1884131907c1ec2ee71a57ef2845a68'
	};

	// req.pipe(request(url)).pipe(res);

	request.get({url:api_url, headers: headers}, (error, response, body) => {
		res.send(body);
	});
});

app.get('/leads', (req, res) => {
	var url = 'https://www.zohoapis.com/crm/v2/leads';
	var headers = {
		'Authorization': 'Zoho-oauthtoken 1000.068a8578bce58f40d9fea10f7696a085.649871a4b93a4a6b3c32b646281d96af'
	};

	request.get({url:url, headers: headers}, (error, response, body) => {
		res.send(body);
	});
});


app.listen(PORT, () => console.log(`Express server currently running on port http://127.0.0.1:${PORT}`));