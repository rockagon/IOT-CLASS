const SerialPort = require('serialport');
const GPS = require('gps');

// Replace with your actual serial port path (e.g., '/dev/ttyUSB0' or '/dev/ttyS0')
const port = new SerialPort('/dev/serial0', {
    baudRate: 9600,
    parser: new SerialPort.parsers.Readline({ delimiter: '\r\n' })
});

const gps = new GPS();

gps.on('data', (data) => {
    // Handle GGA data (contains latitude, longitude, altitude)
    if (data._raw && data._raw.includes('GGA')) {
        console.log(`Latitude: ${data.lat.toFixed(6)} ${data.latPole}`);
        console.log(`Longitude: ${data.lon.toFixed(6)} ${data.lonPole}`);
        console.log(`Altitude: ${data.alt ? `${data.alt} meters` : 'N/A'}`);
    }
    // Handle RMC data (contains latitude, longitude, speed, etc.)
    if (data._raw && data._raw.includes('RMC')) {
        console.log('RMC Data:', data);
    }
});

port.on('data', (data) => {
    gps.update(data.toString());
    console.log('Raw NMEA data:', data.toString());  // This will help you see the raw NMEA sentences.
});

port.on('error', (err) => {
    console.error('Serial port error:', err.message);
});

console.log('Listening for GPS data...');
