var express = require('express'),

actuatorsRoutes = require('../routes/actuators'),
sensorRoutes = require('../routes/sensors'),
piRoutes = require('../routes/pi'),
cors = require('cors');

var app = express();

app.use(cors());

app.use('/', piRoutes);
app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensor', sensorRoutes);

module.exports = app;