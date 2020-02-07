'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});

exports.handler = async (event, context) => {
    let date = new Date();
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});
    
    let responseBody = "";
    let statusCode = 0;
    
    const {pricetimestamp, currency, price} = JSON.parse(event.body);
    
    const params = {
        TableName: "CryptoData",
        Item: {
            // PriceTimeStamp: date.getTime(),
            PriceTimeStamp: pricetimestamp,
            Currency: currency,
            Price: price
        }
    }
    
    
    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err){
        responseBody = `unable to put crypto:  ${err} `;
    }

    
}