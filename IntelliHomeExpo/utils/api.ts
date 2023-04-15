import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const endpoint = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-zcxbi/endpoint/data/v1/action/findOne'
const apiKey = 'BH4ZZFoMj1z7yc6Kjw1jPSJMhC3Ufv7dhAILm5XNlyQr3gKNTPLsGJWSRbiTmpuD'

const feedKey = "humidity";
const AIOUsername = "phatnt";
const AIOKey = "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT";

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

interface AdafruitIOData {
    id: number;
    value: string;
    feed_id: number;
    created_at: string;
}

function getAdafruitIOData(feedKey: string, AIOUsername: string, AIOKey: string): Promise<AdafruitIOData[]> {
    const endpoint = `https://io.adafruit.com/api/v2/${AIOUsername}/feeds/${feedKey}/data`;
    const headers = {
        'Content-Type': 'application/json',
        'X-AIO-Key': AIOKey,
    };

    return axios.get<AdafruitIOData[]>(endpoint, { headers })
        .then((response: AxiosResponse<AdafruitIOData[]>) => {
            return response.data;
        })
        .catch((error: Error) => {
            console.error(error);
            throw error;
        });
}

function sendToAdafruitIOFeed(feedKey: string, AIOUsername: string, AIOKey: string, value: string): Promise<void> {
    const data = {
        value: value
    };

    const config = {
        method: 'post',
        url: `https://io.adafruit.com/api/v2/${AIOUsername}/feeds/${feedKey}/data`,
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': AIOKey,
        },
        data: JSON.stringify(data),
    };

    return axios(config)
        .then(response => {
            console.log(`Value ${value} sent to feed ${feedKey}`);
        })
        .catch(error => {
            console.error(`Error sending value to feed ${feedKey}: ${error}`);
            throw error;
        });
}

export { getUserDataFromApi, getAdafruitIOData, sendToAdafruitIOFeed };