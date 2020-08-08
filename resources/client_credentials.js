//CHANGE CLIENT ID, CLIENT SECRET. WHEN CREATING A NEW CLIENT FROM ZOHO CRM USE THIS BELOW MENTIONED REDIRECT URI 
const credentials = {
    'client_id': '1000.L5SDOBSTN82CB7DI0MVKFOF5XAKDER',
    'client_secret': '092b9f2a48ab592d2824f3583f6d0863fab81d7ab6',
    'redirect_uri': 'http://127.0.0.1:3000/auth/callback',
    'scope': 'ZohoCRM.modules.all,ZohoCRM.users.all',
};

module.exports = credentials;