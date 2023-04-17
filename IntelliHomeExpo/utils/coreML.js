var KNN = /** @class */ (function () {
    function KNN(k) {
        this.tempMin = 25;
        this.tempMax = 35;
        this.humMin = 50;
        this.humMax = 90;
        this.fanMin = 0;
        this.fanMax = 100;
        this.k = k;
        this.datapoints = [];
        for (var i = 0; i < 20; i++) {
            var t_1 = Math.floor(Math.random() * (this.tempMax - this.tempMin + 1)) + this.tempMin; // temperature in degrees Celsius
            var h = Math.floor(Math.random() * (this.humMax - this.humMin + 1)) + this.humMin; // relative humidity as a percentage
            var hi = -42.379 + 2.04901523 * t_1 + 10.14333127 * h - 0.22475541 * t_1 * h - 0.00683783 * Math.pow(t_1, 2) - 0.05481717 * Math.pow(h, 2) + 0.00122874 * Math.pow(t_1, 2) * h + 0.00085282 * t_1 * Math.pow(h, 2) - 0.00000199 * Math.pow(t_1, 2) * Math.pow(h, 2); // heat index in degrees Fahrenheit
            var fs = (hi < 27) ? 0 : (hi > 37) ? 100 : ((hi - 27) / 0.1); // fan speed from 0 to 100
            var noise = Math.floor(Math.random() * (11 - (-10) + 1)) + (-10); // Gaussian noise from -10 to 10
            var fanSpeed = Math.min(Math.max(fs + noise, this.fanMin), this.fanMax);
            this.datapoints.push([t_1, h, fanSpeed]); // add datapoint with fan speed and noise
        }
    }
    KNN.prototype.addElement = function (element) {
        this.datapoints.push(element);
    };
    KNN.prototype.removeElement = function () {
        return this.datapoints.shift();
    };
    KNN.prototype.getKnowledge = function () {
        return this.datapoints;
    };
    KNN.prototype.updateKnowledge = function (element) {
        this.removeElement();
        this.addElement(element);
    };
    KNN.prototype.manhattanDistance = function (a, b) {
        var dt = Math.abs(a[0] - b[0]) / (this.tempMax - this.tempMin);
        var dh = Math.abs(a[1] - b[1]) / (this.humMax - this.humMin);
        return dt + dh;
    };
    KNN.prototype.euclideanDistance = function (a, b) {
        var dt = Math.abs(a[0] - b[0]) / (this.tempMax - this.tempMin);
        var dh = Math.abs(a[1] - b[1]) / (this.humMax - this.humMin);
        return Math.sqrt(Math.pow(dt, 2) + Math.pow(dh, 2));
    };
    KNN.prototype.predict = function (element) {
        var distances = [];
        for (var i = 0; i < this.datapoints.length; i++) {
            distances.push([this.euclideanDistance(element, this.datapoints[i]), this.datapoints[i][2]]);
        }
        distances.sort(function (a, b) { return a[0] - b[0]; });
        var sum = 0;
        for (var i = 0; i < this.k; i++) {
            sum += distances[i][1];
        }
        return sum / this.k;
    };
    return KNN;
}());
var t = new KNN(5);
console.log(t.getKnowledge());
console.log(t.updateKnowledge([30, 70, 1]));
console.log(t.getKnowledge());
console.log(t.predict([30, 70]));
