//DO NOT REMOVE COMPANY AND LAST_NAME FROM DATA OTHERWISE REQUEST WILL FAIL. AND DO NOT REMOVE TRIGGER ALSO.
var leadData = {
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

module.exports = leadData;