function generateData() {
  const data = [];
  for (let i = 0; i < 50; i++) {
    const temperature = Math.floor(Math.random() * 30) + 20;
    const humidity = Math.floor(Math.random() * 50) + 50;
    const fanLevel = Math.floor(Math.random() * 101);
    data.push({ temperature, humidity, fanLevel });
  }
  return data;
}

const D = generateData();
export default D;
