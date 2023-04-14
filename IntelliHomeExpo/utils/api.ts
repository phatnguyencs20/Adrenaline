const endpoint = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-zcxbi/endpoint/data/v1/action/findOne'
const apiKey = 'BH4ZZFoMj1z7yc6Kjw1jPSJMhC3Ufv7dhAILm5XNlyQr3gKNTPLsGJWSRbiTmpuD'

import axios, { AxiosRequestConfig } from 'axios';

interface Filter {
    username: string;
    password: string;
}

interface Projection {
    _id: number;
    firstName: number;
    adafruitIOUsername: number;
    adafruitIOKey: number;
}

interface RequestBody {
    collection: string;
    database: string;
    dataSource: string;
    projection: Projection;
    filter: Filter;
}

interface ResponseData {
    document: {
        _id: string;
        firstName: string;
        adafruitIOUsername: string;
        adafruitIOKey: string;
    };
}

function getUserDataFromApi(username: string, password: string): Promise<ResponseData> {
    const requestBody: RequestBody = {
        collection: 'users',
        database: 'test',
        dataSource: 'Lambda',
        projection: {
            _id: 1,
            firstName: 1,
            adafruitIOUsername: 1,
            adafruitIOKey: 1
        },
        filter: {
            username: username,
            password: password,
        }
    };

    const config: AxiosRequestConfig = {
        method: 'post',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apiKey,
        },
        data: JSON.stringify(requestBody),
    };

    return axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export { getUserDataFromApi };