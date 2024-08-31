iot@iot:~/Desktop/IOT-Lab2/plugins $ sudo node gps5.js
Serial port /dev/serial0 opened successfully.
Skipping invalid or incomplete NMEA sentence: 4*1A
Parsed NMEA sentence: {
  id: 'GPGSV',
  msgs: 4,
  mnum: 1,
  count: 13,
  sat: [
    { prn: 3, el: 32, az: 137, ss: 19 },
    { prn: 4, el: 15, az: 70, ss: 39 },
    { prn: 6, el: 38, az: 251, ss: 38 },
    { prn: 7, el: 28, az: 3, ss: 47 }
  ]
}
Parsed NMEA sentence: {
  id: 'GPGSV',
  msgs: 4,
  mnum: 2,
  count: 13,
  sat: [
    { prn: 8, el: 1, az: 80, ss: 38 },
    { prn: 9, el: 26, az: 36, ss: 39 },
    { prn: 11, el: 14, az: 291, ss: 41 },
    { prn: 14, el: 67, az: 191, ss: 29 }
  ]
}
Parsed NMEA sentence: {
  id: 'GPGSV',
  msgs: 4,
  mnum: 3,
  count: 13,
  sat: [
    { prn: 17, el: 22, az: 191, ss: 29 },
    { prn: 19, el: 13, az: 212, ss: 0 },
    { prn: 20, el: 8, az: 325, ss: 37 },
    { prn: 22, el: 43, az: 201, ss: 26 }
  ]
}
/home/iot/Desktop/IOT-Lab2/node_modules/nmea-0183/lib/NMEA.js:170
        throw new Error('ERROR:' + e);
              ^

Error: ERROR:GSV : not enough tokens
    at /home/iot/Desktop/IOT-Lab2/node_modules/nmea-0183/lib/NMEA.js:170:15
    at Object.nmea.error (/home/iot/Desktop/IOT-Lab2/node_modules/nmea-0183/lib/NMEA.js:155:13)
    at Object.nmea.parse (/home/iot/Desktop/IOT-Lab2/node_modules/nmea-0183/lib/NMEA.js:110:26)
    at ReadlineParser.<anonymous> (/home/iot/Desktop/IOT-Lab2/plugins/gps5.js:26:31)
    at ReadlineParser.emit (node:events:513:28)
    at addChunk (node:internal/streams/readable:315:12)
    at readableAddChunk (node:internal/streams/readable:285:11)
    at ReadlineParser.Readable.push (node:internal/streams/readable:228:10)
    at ReadlineParser._transform (/home/iot/Desktop/IOT-Lab2/node_modules/@serialport/parser-delimiter/dist/index.js:31:18)
    at ReadlineParser.Transform._write (node:internal/streams/transform:205:23)
iot@iot:~/Desktop/IOT-Lab2/plugins $ 

