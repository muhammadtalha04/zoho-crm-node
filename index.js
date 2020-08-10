const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');

const PORT = 3000;
let accessToken = "1000.9abce73fc54cf06c2577ea2c905898cc.2b04145963aea085e7da82a21eec43f7";
const credentials = require('./resources/client_credentials');
const { Assert } = require('zombie');
const task = require('./automate');

app.use(cors());
task.startApp(PORT);

//HOME PAGE
app.get('/', (req, res) => {
	res.redirect('http://127.0.0.1:' + PORT + '/generate-code');
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
	var bodyData = require('./resources/lead-data');

	request.post({ url: url, headers: headers, body: bodyData, json: true }, (error, response, body) => {
		if (response && response["statusCode"] == 201) {
			if (response["body"]["data"].length > 0) {
				if (response["body"]["data"][0]["code"] == "SUCCESS") {
					var newLeadId = response["body"]["data"][0]["details"]["id"];
					res.redirect('http://127.0.0.1:' + PORT + "/lead/" + newLeadId + '/convert/');
					//.send("Lead Created Successfully. <a href='http://127.0.0.1:" + PORT + "/lead/" + newLeadId + "/convert/'>Convert Lead</a>");
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

	let bodyData = {
		"data": [
			{
				"overwrite": false,
				"notify_lead_owner": true,
				"notify_new_entity_owner": true,
				"assign_to": "",
			}
		]
	};

	request.get("http://127.0.0.1:" + PORT + "/user/all", (error, response, body) => {
		if (response && response["statusCode"] == 200) {
			let resData = response["body"];
			resData = JSON.parse(resData);

			if (resData["code"] == 1) {
				const userId = resData["data"]["id"];

				bodyData.data[0].assign_to = userId;

				convert();

				function convert() {
					request.post({ url: url, headers: headers, body: bodyData, json: true }, convertResponse);
				}

				function convertResponse(error1, response1, body1) {
					if (response1["statusCode"] && response1["statusCode"] == 202) {
						if (response1["body"]["data"][0]["code"] == "DUPLICATE_DATA") {
							let convRes = response1["body"]["data"][0];

							if (convRes["details"]["module"] == "Contacts") {
								bodyData.data[0]["Contacts"] = convRes["details"]["id"];

								convert();
							}
							else {
								res.send(convRes["details"]);
							}
						}
						else {
							res.send(response1);
						}
					}
					else if (response1["statusCode"] && response1["statusCode"] == 200) {
						var html = JSON.stringify(response1["body"]["data"][0]) +
							"<br><br><br><a href='http://127.0.0.1:" + PORT + "/account/" + response1["body"]["data"][0]["Accounts"] + "'>Find Account</a>";

						res.send(html);

					}
					else {
						res.send(response1);
					}
				}


			} else if (resData["code"] == 0) {
				res.send(resData["message"]);
			}
		} else {
			res.send("Error" + response["statusCode"]);
		}
	});
});

//GET ACCOUNT
app.get('/account/:id', (req, res) => {
	const url = "https://www.zohoapis.com/crm/v2/Accounts/" + req.params.id;
	const headers = {
		'Authorization': 'Zoho-oauthtoken ' + accessToken
	};

	request.get({ url: url, headers: headers }, (error, response, body) => {
		if (response["statusCode"] == 200) {
			var bd = JSON.parse(body);
			res.send("<pre><code>" + JSON.stringify(bd["data"][0], null, 4) + "</code></pre>");
		}
		else {
			res.send(response);
		}
	});
});

//GET ALL USERS
app.get('/user/all', (req, res) => {
	const url = "https://www.zohoapis.com/crm/v2/users";
	const headers = {
		'Authorization': 'Zoho-oauthtoken ' + accessToken
	};

	request.get({ url: url, headers: headers }, (error, response, body) => {
		let resp = {};

		if (response && response["statusCode"] == 200) {
			let users = response["body"];
			if (typeof users == "string") {
				users = JSON.parse(users);
			}

			if (users["users"].length > 0) {
				resp = {
					"code": 1,
					"message": users["users"].length + " users found.",
					"data": {
						"id": users["users"][0]["id"]
					}
				};
			} else {
				resp = {
					"code": 0,
					"message": "No users found. Create users first."
				};
			}

			res.send(JSON.stringify(resp));
		}
		else {
			res.send({ "code": 0, "message": "Error getting users." });
		}
	});
});

//GET ACCESS TOKEN
app.get('/auth/callback', (req, res) => {
	const grantCode = req.query.code;
	var url = "https://accounts.zoho.com/oauth/v2/token";
	const bodyData = {
		'grant_type': 'authorization_code',
		'client_id': credentials["client_id"],
		'client_secret': credentials["client_secret"],
		'redirect_uri': credentials["redirect_uri"],
		'code': grantCode
	};

	request.post({ url: url, formData: bodyData }, (error, response, body) => {
		if (response["statusCode"] == 200) {
			var resBody = JSON.parse(body);

			if (resBody["access_token"]) {
				accessToken = resBody["access_token"];

				console.log('Access Token: ' + accessToken);
				res.redirect('http://127.0.0.1:' + PORT + '/lead/create');
				//res.send("<a href='http://127.0.0.1:" + PORT + "/lead/create'>Create Lead</a>");
			}
			else {
				res.send("Error: " + resBody["error"]);
			}
		}
	});
});

//GRANT TOKEN
app.get('/generate-code', (req, res) => {
	var url = "https://accounts.zoho.com/oauth/v2/auth?response_type=code&scope=" + credentials["scope"] + "&client_id=" + credentials["client_id"] + "&redirect_uri=" + credentials["redirect_uri"];

	res.redirect(url);
});

app.listen(PORT, () => console.log(`Express server currently running on port http://127.0.0.1:${PORT}`));
