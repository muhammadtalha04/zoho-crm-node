//CHANGE CLIENT ID, CLIENT SECRET. WHEN CREATING A NEW CLIENT FROM ZOHO CRM USE THIS BELOW MENTIONED REDIRECT URI 
const credentials = {
	'email': '', //Enter your email here
    'password': '', //Enter you password here
    'client_id': '1000.RWUUG7KMGWMZZM0ZO6P51BHOOQCSQU',
    'client_secret': '7669b1b83edd8d5dc26e7752b319661a22ba01b9d6',
    'redirect_uri': 'http://127.0.0.1:3000/auth/callback',
    'scope': 'ZohoCRM.modules.all,ZohoCRM.users.all',
};

module.exports = credentials;