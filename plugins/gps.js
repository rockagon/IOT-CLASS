const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const portPath = '/dev/serial0';
const baudRate = 9600;
const port = new SerialPort({ path: portPath, baudRate: baudRate });

console.log(`Attempting to open serial port ${portPath} with baud rate ${baudRate}...`);

port.on('open', () => {
    console.log(`Serial port ${portPath} opened successfully.`);
});

port.on('error', (err) => {
    console.error('Error:', err.message);
});

    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
    console.log('Parser created successfully, waiting for data...');

    let latInDegrees = 0;
    let longInDegrees = 0;
    let altitude = 0;

    function gpsInfo(nmeaBuffer) {
        console.log("Parsing GPS info...");

        const nmeaTime = nmeaBuffer[0]; // extract time from GPGGA string
        const nmeaLatitude = nmeaBuffer[1]; // extract latitude from GPGGA string
        const nmeaLongitude = nmeaBuffer[3]; // extract longitude from GPGGA string
        const nmeaAltitude = nmeaBuffer[8]; // extract altitude from GPGGA string

        console.log("NMEA Time:", nmeaTime);
        console.log("NMEA Latitude:", nmeaLatitude);
        console.log("NMEA Longitude:", nmeaLongitude);
        console.log("NMEA Altitude:", nmeaAltitude);

        const lat = parseFloat(nmeaLatitude);
        const longi = parseFloat(nmeaLongitude);
        altitude = parseFloat(nmeaAltitude); // convert altitude to a float

        latInDegrees = convertToDegrees(lat); // convert latitude to degrees
        longInDegrees = convertToDegrees(longi); // convert longitude to degrees
        console.log("Latitude and Longitude converted to degrees.");
    }

    function convertToDegrees(rawValue) {
        console.log("Converting raw value to degrees:", rawValue);

        const decimalValue = rawValue / 100.0;
        const degrees = Math.floor(decimalValue);
        const mmMmmm = (decimalValue - degrees) / 0.6;
        const position = (degrees + mmMmmm).toFixed(4);

        console.log("Converted position:", position);
        return position;
    }

    const gpggaInfo = "$GPGGA,";

    parser.on('data', (receivedData) => {
        console.log("Received data:", receivedData);

        if (receivedData.includes(gpggaInfo)) {
            console.log("GPGGA data detected.");

            const gpggaBuffer = receivedData.split(gpggaInfo)[1]; // store data after "$GPGGA," string
            console.log("GPGGA buffer:", gpggaBuffer);

            const nmeaBuffer = gpggaBuffer.split(','); // split comma-separated data into buffer
            console.log("NMEA buffer:", nmeaBuffer);

            gpsInfo(nmeaBuffer); // process GPS info

            console.log("Lat in degrees:", latInDegrees, "Long in degrees:", longInDegrees, "Altitude:", altitude);
            const mapLink = `http://maps.google.com/?q=${latInDegrees},${longInDegrees}`;
            console.log("<<<<<<<<Press Ctrl+C to plot location on Google Maps>>>>>>>>");
            console.log("------------------------------------------------------------");
        } else {
            console.log("GPGGA data not found in received data.");
        }
    });

process.on('SIGINT', async () => {
    console.log("SIGINT received, attempting to open Google Maps...");

    const mapLink = `http://maps.google.com/?q=${latInDegrees},${longInDegrees}`;
    const open = await import('open'); // dynamically import the 'open' package
    open.default(mapLink); // open the location on Google Maps

    console.log("Google Maps opened successfully.");
    process.exit(0);
});
