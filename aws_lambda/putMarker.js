'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});
    
    let responseBody = "";
    let statusCode = 0;
    

    
    const params = {
        TableName: "PlacesMarkers",
        Item: {
            Place: "Middlesex University",
            Lat: 51.590746, 
            Lon: -0.230526
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