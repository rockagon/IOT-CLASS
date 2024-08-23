var httpServer = require('./servers/http');
var resources = require('./resources/model');
var pir = require('./plugins/pir');
var ldr = require('./plugins/ldr');
var temp = require('./plugins/temp');
var lcd = require('./plugins/lcd');

// //Start the HTTP server
// httpServer.listen(8888, function () {
//     console.log('The Pi is up and running on port %s', 8888);
// });