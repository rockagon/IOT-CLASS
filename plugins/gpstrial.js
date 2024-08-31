const { SerialPort } = require('serialport');
const portPath = '/dev/serial0'; // 
const baudRate = 9600; //
const port = new SerialPort({ path: portPath, baudRate: baudRate });

port.on('open', () => {
    console.log(`Serial port ${portPath} opened successfully.`);
});

port.on('data', (data) => {
    console.log("Raw data received:", data.toString());
});

port.on('error', (err) => {
    console.error('Error:', err.message);
});

