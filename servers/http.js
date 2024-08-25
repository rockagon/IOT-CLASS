var express = require('express');
var router = express.Router();
var path = require('path');
var cors = require('cors');
var resources = require('./../resources/resources.json');
var piRoutes = require('../routes/pi');
var QualityFactors = require('../QualityFactors');
var app = express();

// Middleware for CORS
app.use(cors());

// Serve static files (e.g., UI files)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/pi', piRoutes);

app
.get('/', (req, res) => {
    // router.route('/').get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);

        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(resources);
        } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <h1>WELCOME TO THE CMU AFRICA IOT CLASS PROJECTS PORTAL</h1>
                <p><a href="/pi">Raspberry Pi based simple smart home</a></p>
            `);
        } else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
            res.json(resources);
        } else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <h1>WELCOME TO THE CMU AFRICA IOT CLASS PROJECTS PORTAL</h1>
                <p><a href="/pi">Raspberry Pi based simple smart home</a></p>
            `);
        }
        else if (!accept.includes('text/html') && accept.includes('application/json')) { 
            res.json(resources);
        }
    })
    .head(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
    
        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.set('Content-Type', 'application/json');
        } 
        else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.set('Content-Type', 'text/html');
        }
        else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
            res.set('Content-Type', 'application/json');
        } 
        else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.set('Content-Type', 'text/html');
        }
        else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.set('Content-Type', 'application/json');
        }
        else {
            res.end(); // Terminate the response without sending a body
        }
      });
    

app.listen(8000, function () {
    console.log('Server is running on port 8000');
});

module.exports = app;
