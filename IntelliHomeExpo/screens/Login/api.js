const axios = require('axios');

const endpoint = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-zcxbi/endpoint/data/v1/action/findOne'
const apiKey = 'BH4ZZFoMj1z7yc6Kjw1jPSJMhC3Ufv7dhAILm5XNlyQr3gKNTPLsGJWSRbiTmpuD'

// feedKey can be "humidity", "temperature", "miniled", "minifan"
var feedKey = "humidity";
var AIOUsername = "phatnt";
var AIOKey = "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT";

function getUserDataFromApi(username, password) {
    var data = JSON.stringify({
        "collection": "users",
        "database": "test",
        "dataSource": "Lambda",
        "projection": {
            "_id": 1,
            "firstName": 1,
            "adafruitIOUsername": 1,
            "adafruitIOKey": 1
        },
        "filter": {
            "username": username,
            "password": password,
        },
    });

    const config = {
        method: 'post',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apiKey,
        },
        data: data,
    };

    return axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}

function getAdafruitIOData(feedKey, AIOUsername, AIOKey) {
    const endpoint = `https://io.adafruit.com/api/v2/${AIOUsername}/feeds/${feedKey}/data`;
    const headers = {
        'Content-Type': 'application/json',
        'X-AIO-Key': AIOKey,
    };

    return axios.get(endpoint, { headers })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}





// export { getUserDataFromApi, getAdafruitIOData, sendToAdafruitIOFeed };

// Sample functions' calls
// getAdafruitIOData(feedKey, AIOUsername, AIOKey)
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error(error);
//     });
// sendToAdafruitIOFeed(feedKey, AIOUsername, AIOKey, 42);
// sendToAdafruitIOFeed("miniled", AIOUsername, AIOKey, 1);

getUserDataFromApi('phatnt', 'password')
  .then(() => {
  })
  .catch((error) => {
    // handle error here
  });
