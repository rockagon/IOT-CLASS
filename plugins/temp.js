const sensor = require('node-dht-sensor');

// Initialize the sensor (DHT22, GPIO pin)
sensor.initialize(22, 529);

// Function to read the sensor data
function readSensorData() {
    const readout = sensor.read();

    console.log(`Temperature: ${readout.temperature.toFixed(2)} °C`);
    console.log(`Humidity: ${readout.humidity.toFixed(2)} %`);

    // Read data every 2 seconds
    setTimeout(readSensorData, 2000);
}

// Start reading the sensor data
readSensorData();

console.log('Rock');