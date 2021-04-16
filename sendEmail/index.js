const AWS = require('aws-sdk');
const randomBytes = require('crypto').randomBytes;
const ses = new AWS.SES();
const ddb = new AWS.DynamoDB.DocumentClient();
const SENDER = "zhang11liwen@gmail.com";

const response = {
    "statusCode": 200,
    "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    "body": {}
};

exports.handler = function(event, context, callback) {
    console.log('\nReceived event:', event);
    const messageId = toUrlString(randomBytes(16));

    sendEmail(event).then((res) => {
        response.body["success"] = true;
        saveMessage(messageId, event).then((res) => {

            console.log(`\nMessage with ID ${messageId} saved to database`);
            callback(null, response);

        }).catch((err) => {
            console.log("\nDatabase error: ", err);
        });
    }).catch((err) => {
        response.body["success"] = false;
        callback(null, response);
        console.log("\nEmail failed: ", err);
    });

};

// Sends an email only to verified SES email addresses
function sendEmail(event, done) {

    return new Promise((resolve, reject) => {
        const params = {
            Destination: {
                ToAddresses: [
                    event.email
                ]
            },
            Message: {
                Body: {
                    Text: {
                        Data: event.message,
                        Charset: 'UTF-8'
                    }
                },
                Subject: {
                    Data: event.name,
                    Charset: 'UTF-8'
                }
            },
            Source: SENDER
        };
        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.log("\nFailed to send email: ", err);
                reject(err);
            }
            else {
                console.log("\nSuccessfully sent email: ", data);
                resolve(data);
            }
        });
    });
}

// Saves the message to DynamoDB
function saveMessage(messageId, event) {
    return ddb.put({
        TableName: 'Messages',
        Item: {
            messageId: messageId,
            name: event.name,
            email: event.email,
            message: event.message,
        },
    }).promise();
}

// Helper method to generate unique messageId
function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
