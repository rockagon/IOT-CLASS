const SerialPort = require('serialport');
const GPS = require('gps');

// Setup the serial port
const ser = new SerialPort('/dev/ttyAMA0', {
    baudRate: 9600,
    parser: new SerialPort.parsers.Readline({ delimiter: '\r\n' }),
    timeout: 1000 // equivalent to Python's timeout=1
});

const gps = new GPS();

gps.on('data', (parsedData) => {
    // Only process if it's a GPRMC sentence
    if (parsedData.type === 'RMC') {
        const lat = parsedData.lat;
        const lng = parsedData.lon;
        const gpsData = `Latitude=${lat} and Longitude=${lng}`;
        console.log(gpsData);
    }
});

ser.on('data', (newdata) => {
    // Update GPS data stream
    gps.update(newdata.toString());
    console.log('Raw data:', newdata.toString()); // Optionally print the raw NMEA data
});

ser.on('error', (err) => {
    console.error('Serial port error:', err.message);
});

console.log('Listening for GPS data...');
