import D from "../mockup-data/D.js"

// Đọc dữ liệu từ file D.json
const data = D;

// Chuyển đổi dữ liệu vào mảng giá trị đầu vào và nhãn tương ứng
const inputs = data.map((item: any) => [item.temperature, item.humidity]);
const labels = data.map((item: any) => item.fan_level);

// Hàm tính khoảng cách Euclid giữa hai điểm trong không gian n chiều
function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
}

// Hàm tìm k điểm gần nhất với điểm cần dự đoán
function getNeighbors(k: number, testInput: number[]): number[] {
  const distances = [];
  for (let i = 0; i < inputs.length; i++) {
    const distance = euclideanDistance(testInput, inputs[i]);
    distances.push({ distance, index: i });
  }
  distances.sort((a, b) => a.distance - b.distance);
  const neighbors = [];
  for (let i = 0; i < k; i++) {
    neighbors.push(labels[distances[i].index]);
  }
  return neighbors;
}

// Hàm dự đoán fan_level cho một điểm dữ liệu mới
function predict(k: number, testInput: number[]): number {
  const neighbors = getNeighbors(k, testInput);
  const prediction = neighbors.reduce((acc, curr) => acc + curr, 0) / neighbors.length;
  return Math.round(prediction);
}

export default predict;


// Dùng hàm predict để dự đoán fan_level cho một điểm dữ liệu mới
// const testInput = [25, 70];
// const k = 3;
// const predictedFanLevel = predict(k, testInput);
// console.log('Predicted fan level:', predictedFanLevel);