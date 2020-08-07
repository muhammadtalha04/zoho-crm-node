const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const { head } = require('request');
const { response } = require('express');

const PORT = 3000;
let newLeadId = "";
const accessToken = "1000.f129470a547e35f060436841d40e1015.dbbfaf4e3bf99d87e8796d72d5bbcc26";

app.use(cors());

//HOME PAGE
app.get('/', (req, res) => {
	var api_url = "https://www.zohoapis.com/crm/v2/settings/modules";
	var headers = {
		'Authorization': 'Zoho-oauthtoken ' + accessToken
	};

	request.get({ url: api_url, headers: headers }, (error, response, body) => {
		res.send(body);
	});
});

//ALL LEADS
app.get('/leads', (req, res) => {
	var url = 'https://www.zohoapis.com/crm/v2/leads';
	var headers = {
		'Authorization': 'Zoho-oauthtoken ' + accessToken
	};

	request.get({ url: url, headers: headers }, (error, response, body) => {
		res.send(body);
	});
});

//CREATE LEAD
app.get('/lead/create', (req, res) => {
	var url = 'https://www.zohoapis.com/crm/v2/leads';
	var headers = {
		'Authorization': 'Zoho-oauthtoken ' + accessToken
	};
	var bodyData = {
		"data": [
			{
				"Company": "E-Corp",
				"Last_Name": "Elliot",
				"First_Name": "",
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
		if (response && response["statusCode"] == 201) {
			if (response["body"]["data"].length > 0) {
				if (response["body"]["data"][0]["code"] == "SUCCESS") {
					newLeadId = response["body"]["data"][0]["details"]["id"];

					res.send("Lead Created Successfully. <a href='http://127.0.0.1:3000/lead/" + newLeadId + "/convert/'>Convert Lead</a>");
				}
				else {
					res.send("Error creating Lead");
				}
			}
			else {
				res.send("Error creating Lead");
			}
		}
		else {
			res.send(response);
		}

	});
});

//CONVERT LEAD TO CONTACT AND ACCOUNT
app.get('/lead/:id/convert', (req, res) => {
	const leadId = req.params.id;
	const url = "https://www.zohoapis.com/crm/v2/Leads/" + leadId + "/actions/convert";
	const headers = {
		'Authorization': 'Zoho-oauthtoken ' + accessToken
	};
	const bodyData = {
		"data": [
			{
				"overwrite": false,
				"notify_lead_owner": true,
				"notify_new_entity_owner": true,
				// "Accounts": "4000000373187",
				// "Contacts": "4000000372131",
				"assign_to": "721176428",
			}
		]
	};

	request.post({ url: url, headers: headers }, (error, response, body) => {
		res.send("<h2>Response</h2><br>" + response);
		res.send("<br><hr><br><h2>Body</h2><br>" + body);
	});
});

//GET ACCESS TOKEN
app.get('/token', (req, res) => {
	var url = "https://accounts.zoho.com/oauth/v2/token";
	const bodyData = {
		'grant_type': 'authorization_code',
		'client_id': '1000.W7T2T4V4JLKCFRVWVZB9U4MVNPL4PB',
		'client_secret': '394a90c7aca362921485bcdf7df00aa64cf95e1b7c',
		'redirect_uri': 'https://www.getpostman.com/oauth2/callback',
		'code': '1000.11d60444df9ecae608ce12d901660e2b.699b1f74573898f4ea8aa86ec79a8443'
	};

	request.post({ url: "https://accounts.zoho.com/oauth/v2/token", body: bodyData, json: true }, (error, response, body) => {
		// res.set(err);
		res.send(response);
		console.log(body);
	});
});

app.listen(PORT, () => console.log(`Express server currently running on port http://127.0.0.1:${PORT}`));