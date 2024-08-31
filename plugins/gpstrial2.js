const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const { nmea } = require('nmea-0183');

const portPath = '/dev/serial0'; // 
const baudRate = 9600; //
const port = new SerialPort({ path: portPath, baudRate: baudRate,autoOpen: true,});

port.on('open', () => {
    console.log(`Serial port ${portPath} opened successfully.`);
});
  port.on('data', (data) => {
      console.log("Raw data received:", data.toString('latin1'));
  });

 port.on('error', (err) => {
     console.error('Error:', err.message);
 });


const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let latitude, longitude, altitude;

parser.on('data', (line) => {
  try {
    const decodedLine = line.toString('latin1');
    
    if (decodedLine.startsWith('$GPRMC')) {
      const msg = nmea.parse(decodedLine);
      latitude = msg.latitude;
      longitude = msg.longitude;
      if (altitude !== undefined) {
        const gps = `Latitude=${latitude}, Longitude=${longitude}, Altitude=${altitude} meters`;
        console.log(gps);
      }
    } else if (decodedLine.startsWith('$GPGGA')) {
      const msg = nmea.parse(decodedLine);
      altitude = msg.altitude;
      if (latitude !== undefined && longitude !== undefined) {
        const gps = `Latitude=${latitude}, Longitude=${longitude}, Altitude=${altitude} meters`;
        console.log(gps);
      }
    }
  } catch (error) {
    console.error('Error parsing data:', error);
  }
});
