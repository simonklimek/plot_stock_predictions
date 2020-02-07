const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let statusCode = 0;
    let responseBody = '';
    
    const { name } = event.Records[0].s3.bucket;
    const { key } = event.Records[0].s3.object;
    
    const getObjectparams = {
        Bucket: name,
        Key: key
    };
    
    try{
        const s3Data = await s3.getObject(getObjectparams).promise();
        const usersStr = s3Data.Body.toString();
        const usersJSON = JSON.parse(usersStr);
        console.log(`Users ::: ${usersStr}`);
        
        await Promise.all(usersJSON.map(async user => {
            const { id, firstname, lastname } = user;
            
            const putParams = {
            TableName: "Users-json",
            Item: {
                id: id,
                firstname: firstname,
                lastname: lastname
                }
            };
        
        await documentClient.put(putParams).promise();
        
        }));
        
        
       responseBody = 'Succedded adding users';
        statusCode = 201;
        
    } catch (err){
        responseBody = 'Error adding users';
        statusCode = 403;
    };
    
    const response = {
        statusCode: statusCode,
        body: responseBody
    };
    
    return response;
};
