import { AxiosResponse } from 'axios';
import axios from 'axios';

class KNN {
    private datapoints: number[][];
    private k: number;

    private tempMin = 25;
    private tempMax = 35;
    private humMin = 50;
    private humMax = 90;
    private fanMin = 0;
    private fanMax = 100;

    constructor(k: number) {
        this.k = k;

        this.datapoints = [];
        for (let i = 0; i < 20; i++) {
            const t = Math.floor(Math.random() * (this.tempMax - this.tempMin + 1)) + this.tempMin; // temperature in degrees Celsius
            const h = Math.floor(Math.random() * (this.humMax - this.humMin + 1)) + this.humMin; // relative humidity as a percentage
            const hi = -42.379 + 2.04901523 * t + 10.14333127 * h - 0.22475541 * t * h - 0.00683783 * t ** 2 - 0.05481717 * h ** 2 + 0.00122874 * t ** 2 * h + 0.00085282 * t * h ** 2 - 0.00000199 * t ** 2 * h ** 2; // heat index in degrees Fahrenheit
            const fs = (hi < 27) ? 0 : (hi > 37) ? 100 : ((hi - 27) / 0.1); // fan speed from 0 to 100
            const noise = Math.floor(Math.random() * (11 - (-10) + 1)) + (-10); // Gaussian noise from -10 to 10
            const fanSpeed = Math.min(Math.max(fs + noise, this.fanMin), this.fanMax);
            this.datapoints.push([t, h, fanSpeed]); // add datapoint with fan speed and noise
        }
    }

    addElement(element: number[]) {
        this.datapoints.push(element);
    }

    removeElement() {
        return this.datapoints.shift();
    }

    getKnowledge() {
        return this.datapoints;
    }

    updateKnowledge(element: number[]) {
        this.removeElement();
        this.addElement(element);
    }

    manhattanDistance(a: number[], b: number[]): number {
        const dt = Math.abs(a[0] - b[0]) / (this.tempMax - this.tempMin);
        const dh = Math.abs(a[1] - b[1]) / (this.humMax - this.humMin);
        return dt + dh;
    }

    euclideanDistance(a: number[], b: number[]): number {
        const dt = Math.abs(a[0] - b[0]) / (this.tempMax - this.tempMin);
        const dh = Math.abs(a[1] - b[1]) / (this.humMax - this.humMin);
        return Math.sqrt(dt ** 2 + dh ** 2);
    }

    predict(element: number[]): number {
        const distances = [];
        for (let i = 0; i < this.datapoints.length; i++) {
            distances.push([this.euclideanDistance(element, this.datapoints[i]), this.datapoints[i][2]]);
        }
        distances.sort((a, b) => a[0] - b[0]);
        let sum = 0;
        for (let i = 0; i < this.k; i++) {
            sum += distances[i][1];
        }
        return sum / this.k;
    }
}

// Define function to convert image to base64 string
const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
            const base64 = reader.result?.toString().split(',')[1];
            if (base64) {
                resolve(base64);
            } else {
                reject(new Error("Failed to convert image to base64"));
            }
        };
    });
};

// Define function to send post request to Flask API
const sendPredictionRequest = async (imageUri: string): Promise<number> => {
    const base64Image = await convertImageToBase64(imageUri);
    const response: AxiosResponse<number> = await axios.post('http://192.168.31.209:8000/predict', { image: base64Image });
    return response.data;
};

export { KNN, sendPredictionRequest };

export const model = new KNN(9);
