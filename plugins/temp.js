const sensor = require('node-dht-sensor');

// Initialize the sensor (DHT22, GPIO pin)
const sensorType = 22;
const gpioPin = 4; // Use a valid GPIO pin number

if (sensor.initialize(sensorType, gpioPin)) {
    console.log('Sensor initialized successfully');

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
} else {
    console.error('Failed to initialize sensor');
}

console.log('Rock');
