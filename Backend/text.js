var axios = require('axios');
var data = JSON.stringify({
    "collection": "users",
    "database": "test",
    "dataSource": "Lambda",
    "projection": {
        "_id": 1,
        "firstName": 1,
        "adafruitIOUsername": 1,
        "adafruitIOKey": 1
    }
});

const url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-zcxbi/endpoint/data/v1/action/findOne'
const apiKey = 'BH4ZZFoMj1z7yc6Kjw1jPSJMhC3Ufv7dhAILm5XNlyQr3gKNTPLsGJWSRbiTmpuD'

var config = {
    method: 'post',
    url: url,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': apiKey,
    },
    data: data
};

axios(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
