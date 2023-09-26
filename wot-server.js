httpServer = require('./servers/http')
resources = require('./resources/model')
ledplugins = require('./plugins/ledsPlugin')
pirplugins = require('./plugins/pirPlugin')

httpServer.listen(8080, function () {
    console.log('Your WoT Pi is up and running on port %s',
    8080);
});
