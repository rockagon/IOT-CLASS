const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const resources = require('./resources/resources.json');
const piRoutes = require('./routes/pi');
const videoStreamPlugin = require('./plugins/camera');
const QualityFactors = require('./QualityFactors');
const pir = require('./plugins/pir');
const ldr = require('./plugins/ldr');
const temp = require('./plugins/temp');
const lcd = require('./plugins/lcd');
//const gps = require('./plugins/gps');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Use the video streaming plugin
videoStreamPlugin(io);

// API Routes
app.use('/pi', piRoutes);

// Handle root route with content negotiation
app.route('/')
  .get((req, res) => {
      const accept = req.headers.accept || 'application/json';
      const qualityFactors = QualityFactors.parseQualityFactors(accept);

      if (qualityFactors['application/json'] > qualityFactors['text/html']) {
          res.json(resources);
      } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
          res.send(`
              <h1>CMU-AFRICA IOT CLASS PROJECTS PORTAL</h1>
              <p><a href="/pi">Raspberry Pi based simple smart home</a></p>
          `);
      } else if (accept.includes('text/html') && !accept.includes('application/json')) {
          res.send(`
              <h1>CMU-AFRICA IOT CLASS PROJECTS PORTAL</h1>
              <p><a href="/pi">Raspberry Pi based simple smart home</a></p>
          `);
      } else if (!accept.includes('text/html') && accept.includes('application/json')) { 
          res.json(resources);
      }
  })
  .head((req, res) => {
      const accept = req.headers.accept || 'application/json';
      const qualityFactors = QualityFactors.parseQualityFactors(accept);

      if (qualityFactors['application/json'] > qualityFactors['text/html']) {
          res.set('Content-Type', 'application/json');
      } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
          res.set('Content-Type', 'text/html');
      } else if (accept.includes('text/html') && !accept.includes('application/json')) {
          res.set('Content-Type', 'text/html');
      } else if (!accept.includes('text/html') && accept.includes('application/json')) {
          res.set('Content-Type', 'application/json');
      } else {
          res.end();
      }
  });

// Start the server
server.listen(8000, () => {
  console.log('WoT server with video streaming is listening on port 8000');
});
