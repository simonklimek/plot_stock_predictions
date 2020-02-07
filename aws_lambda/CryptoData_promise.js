let AWS = require("aws-sdk");

/* A simple scan only requires the table name */
let params = {
    TableName: "CryptoData"
};

//Create client for accessing DynamoDB
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Returns all data from CryptoTable */
exports.handler = async (event) => {
    //Return database code wrapped in a promise
    return new Promise((resolve, reject) =>{

        //Scan table to retrieve all data
        documentClient.scan(params, (err, data) => {
            if (err) {
                console.log("\nERROR: " + err + "\n");

                //Reject promise - client will receive "Internal server error"
                reject(err);
            }
            else {
                console.log("\nDATA:\n" + JSON.stringify(data) + "\n");

                //Resolve promise with data from database
                let response = {
                    statusCode: 200,
                    body: JSON.stringify(data)

                }
                resolve(response);
            }
        });
    });
};

