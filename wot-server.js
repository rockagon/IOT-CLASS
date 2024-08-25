var express = require('express');
var httpServer = require('./servers/http');
var resources = require('./resources/model');
var pir = require('./plugins/pir');
var ldr = require('./plugins/ldr');
var temp = require('./plugins/temp');
var lcd = require('./plugins/lcd');