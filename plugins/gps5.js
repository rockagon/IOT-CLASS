const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const nmea = require('nmea-0183');

const portPath = '/dev/serial0';
const baudRate = 9600;

const port = new SerialPort({ path: portPath, baudRate: baudRate, autoOpen: true });

port.on('open', () => {
    console.log(`Serial port ${portPath} opened successfully.`);
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (line) => {
    try {
        const decodedLine = line.toString('utf8').trim();

        // Basic validation to ensure the line starts with $ and is not empty
        if (!decodedLine.startsWith('$') ) {
            console.log('Skipping invalid or incomplete NMEA sentence:', decodedLine);
            return;
        }

        const sentence = nmea.parse(decodedLine);

        if (sentence) {
            console.log('Parsed NMEA sentence:', sentence);

            if (sentence.sentenceId === 'GGA' && sentence.fixType && sentence.latitude && sentence.longitude) {
                console.log('Got location via GGA packet:', sentence.latitude, sentence.longitude);
            }

            if (sentence.sentenceId === 'RMC' && sentence.status === 'A' && sentence.latitude && sentence.longitude) {
                console.log('Got location via RMC packet:', sentence.latitude, sentence.longitude);
            }
        } else {
            console.log('Invalid NMEA sentence:', decodedLine);
        }
    } catch (error) {
        console.error('Error processing NMEA sentence:', line, error);
    }
});
