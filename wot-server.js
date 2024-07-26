httpServer = require('./servers/http')
resources = require('./resources/model')
pir = require('./plugins/pir')
ldr = require('./plugins/ldr')
temp = require('./plugins/temp')
lcd = require('./plugins/lcd')

httpServer.listen(8080, function () {
    console.log('The Pi is up and running on port %s',
    8080);
});
