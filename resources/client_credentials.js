//CHANGE CLIENT ID, CLIENT SECRET. WHEN CREATING A NEW CLIENT FROM ZOHO CRM USE THIS BELOW MENTIONED REDIRECT URI 
const credentials = {
    'client_id': '1000.W7T2T4V4JLKCFRVWVZB9U4MVNPL4PB',
    'client_secret': '394a90c7aca362921485bcdf7df00aa64cf95e1b7c',
    'redirect_uri': 'http://127.0.0.1:3000/auth/callback',
    'scope': 'ZohoCRM.modules.all,ZohoCRM.users.all',
};

module.exports = credentials;