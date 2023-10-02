var express = require('express'),

actuatorsRoutes = require('../routes/actuators'),
sensorsRoutes = require('../routes/sensors'),
piRoutes = require('../routes/pi'),
cors = require('cors');

var app = express();

app.use(cors());

app.use('/', piRoutes);
app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorsRoutes);

module.exports = app;