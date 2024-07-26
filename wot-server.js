httpServer = require('./servers/http')
resources = require('./resources/model')
pirplugins = require('./plugins/pirPlugin')
ldr = require('./plugins/ldr')
temp = require('./plugins/temp')

httpServer.listen(8080, function () {
    console.log('The Pi is up and running on port %s',
    8080);
});
