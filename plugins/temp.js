const sensor = require('node-dht-sensor');

// Initialize the sensor (DHT22, GPIO pin)
const sensorType = 22;
const gpioPin = 17; // Use a valid GPIO pin number
var temperature = 0;
var humidity = 0;

if (sensor.initialize(sensorType, gpioPin)) {
    console.log('Sensor initialized successfully');

    // Function to read the sensor data
    function readSensorData() {
        const readout = sensor.read();
        temperature = readout.temperature.toFixed(2);
        humidity = readout.humidity.toFixed(2);
        console.log(`Temperature: ${temperature} °C`);
        console.log(`Humidity: ${humidity} %`);

        // Read data every 2 seconds
        setTimeout(readSensorData, 2000);
    }

    // Start reading the sensor data
    readSensorData();
} else {
    console.error('Failed to initialize sensor');
}

console.log('Rock');
