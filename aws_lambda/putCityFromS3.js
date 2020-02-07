const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const { name } = event.Records[0].s3.bucket;
    const { key } = event.Records[0].s3.object
    
    const params = {
        Bucket: name,
        Key: key
    }
    
    try{
        const data = await s3.getObject(params).promise();
        const usersStr = data.Body.toString();
        const usersJSON = JSON.parse(usersStr);
        console.log(`Users ::: ${usersStr}`);
    } catch (err){
        console.log(err);
    }
};
