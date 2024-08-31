const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { nmea } = require('nmea-0183');

const portPath = '/dev/serial0'; // 
const baudRate = 9600; //
const port = new SerialPort({ path: portPath, baudRate: baudRate,autoOpen: true,});

port.on('open', () => {
    console.log(`Serial port ${portPath} opened successfully.`);
});
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on("data", line => {
    try {
        const packet = nmea.parseNmeaSentence(line);

        if (packet.sentenceId === "RMC" && packet.status === "valid") {
            console.log("Got location via RMC packet:", packet.latitude, packet.longitude);
        }

        if (packet.sentenceId === "GGA" && packet.fixType !== "none") {
            console.log("Got location via GGA packet:", packet.latitude, packet.longitude);
        }

        if (packet.sentenceId === "GSA") {
            console.log("There are " + packet.satellites.length + " satellites in view.");
        }
    } catch (error) {
        console.error("Got bad packet:", line, error);
    }
});