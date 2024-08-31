var express = require('express');
var router = express.Router();
var resources = require('../resources/resources.json');
var QualityFactors = require('../QualityFactors');

router.route('/')
    .get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
        const pi = resources.pi;

        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(pi);
        }
        else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <html>
                <body>
                    <h1>${resources.pi.name}</h1>
                    <p>${resources.pi.description}</p>
                    <ul>
                        <li><a href="/pi/sensors">Sensors</a></li>
                        <li><a href="/pi/actuators">Actuators</a></li>
                    </ul>
                </body>
                </html>
            `);
          } 
        //  else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
        // //     res.json(resources);
        // // } 
        else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <html>
                <body>
                    <h1>${resources.pi.name}</h1>
                    <p>${resources.pi.description}</p>
                    <ul>
                        <li><a href="/pi/sensors">Sensors</a></li>
                        <li><a href="/pi/actuators">Actuators</a></li>
                    </ul>
                </body>
                </html>
            `);
        }
        else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.json(pi);
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
    // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.set('Content-Type', 'application/json');
    // } 
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

router.route('/sensors')
    .get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
        const sensors = resources.pi.sensors;
        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(sensors);
        } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <html>
                <body>
                    <h1>Sensors</h1>
                    <ul>
                        <li><a href="/pi/sensors/pir">PIR Sensor</a></li>
                        <li><a href="/pi/sensors/ldr">LDR Sensor</a></li>
                        <li><a href="/pi/sensors/dht22">DHT22 Sensor</a></li>
                        <li><a href="/pi/sensors/camera">Camera Streamming</a></li>
                    </ul>
                    <a href="/pi">Back to Home</a>
                </body>
                </html>
            `);
        } 
        // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
        //     res.json(resources);
        // } 
        else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <html>
                <body>
                    <h1>Sensors</h1>
                    <ul>
                        <li><a href="/pi/sensors/pir">PIR Sensor</a></li>
                        <li><a href="/pi/sensors/ldr">LDR Sensor</a></li>
                        <li><a href="/pi/sensors/dht22">DHT22 Sensor</a></li>
                    </ul>
                    <a href="/pi">Back to Home</a>
                </body>
                </html>
            `);
        } else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.json(sensors);
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
    // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.set('Content-Type', 'application/json');
    // } 
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


router.route('/sensors/pir')
    .get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
        const pirSensor = resources.pi.sensors.pir;

        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(pirSensor);
        } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <html>
                <body>
                    <h1>PIR Sensor</h1>
                    <p>Name: ${pirSensor.name}</p>
                    <p>Description: ${pirSensor.description}</p>
                    <p>Status: ${pirSensor.value}</p>
                    <a href="/pi/sensors">Back to Sensors</a>
                </body>
                </html>
            `);
        } 
        // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
        //     res.json(resources);
        // } 
        else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <html>
                <body>
                    <h1>PIR Sensor</h1>
                    <p>Name: ${pirSensor.name}</p>
                    <p>Description: ${pirSensor.description}</p>
                    <p>Status: ${pirSensor.value}</p>
                    <a href="/pi/sensors">Back to Sensors</a>
                </body>
                </html>
            `);
        } else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.json(pirSensor);
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
    // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.set('Content-Type', 'application/json');
    // } 
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


router.route('/sensors/ldr')
    .get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
        const ldrSensor = resources.pi.sensors.ldr;

        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(ldrSensor);
        } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <html>
                <body>
                    <h1>LDR Sensor</h1>
                    <p>Name: ${ldrSensor.name}</p>
                    <p>Description: ${ldrSensor.description}</p>
                    <p>Status: ${ldrSensor.value}</p>
                    <a href="/pi/sensors">Back to Sensors</a>
                </body>
                </html>
            `);
        } 
        // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
        //     res.json(resources);
        // } 
        else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <html>
                <body>
                    <h1>LDR Sensor</h1>
                    <p>Name: ${ldrSensor.name}</p>
                    <p>Description: ${ldrSensor.description}</p>
                    <p>Status: ${ldrSensor.value}</p>
                    <a href="/pi/sensors">Back to Sensors</a>
                </body>
                </html>
            `);
        } else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.json(ldrSensor);
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
    // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.set('Content-Type', 'application/json');
    // } 
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


router.route('/sensors/dht22')
    .get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
        const dht22Sensor = resources.pi.sensors.dht22;

        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(dht22Sensor);
        } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <html>
                <body>
                    <h1>DHT22 Sensor</h1>
                    <p>Name: ${dht22Sensor.name}</p>
                    <p>Description: ${dht22Sensor.description}</p>
                    <p>Temperature: ${dht22Sensor.temperature.value}</p>
                    <p>Humidity: ${dht22Sensor.humidity.value}</p>
                    <a href="/pi/sensors">Back to Sensors</a>
                </body>
                </html>
            `);
        } 
        // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
        //     res.json(resources);
        // } 
        else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <html>
                <body>
                    <h1>DHT22 Sensor</h1>
                    <p>Name: ${dht22Sensor.name}</p>
                    <p>Description: ${dht22Sensor.description}</p>
                    <p>Temperature: ${dht22Sensor.temperature.value}</p>
                    <p>Humidity: ${dht22Sensor.humidity.value}</p>
                    <a href="/pi/sensors">Back to Sensors</a>
                </body>
                </html>
            `);
        } else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.json(dht22Sensor);
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
    // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.set('Content-Type', 'application/json');
    // } 
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

// Route for the camera stream
router.route('/sensors/camera')
  .get(function (req, res, next) {
      const accept = req.headers.accept || 'application/json';
      const qualityFactors = QualityFactors.parseQualityFactors(accept);
      const camera = resources.pi.sensors.camera;

      if (qualityFactors['text/html'] > qualityFactors['application/json']) {
          res.sendFile(path.join(__dirname, '../public/video.html'));
      } else if (qualityFactors['application/json'] > qualityFactors['text/html']) {
        res.json(camera);
      } else if (accept.includes('text/html') && !accept.includes('application/json')) {
          res.sendFile(path.join(__dirname, '../public/video.html'));
      } else if (!accept.includes('text/html') && accept.includes('application/json')) {
        res.json(camera);
      }
  })
  .head(function (req, res, next) {
      const accept = req.headers.accept || 'application/json';
      const qualityFactors = QualityFactors.parseQualityFactors(accept);

      if (qualityFactors['text/html'] > qualityFactors['application/json']) {
          res.set('Content-Type', 'text/html');
      } else if (qualityFactors['application/json'] > qualityFactors['text/html']) {
          res.set('Content-Type', 'application/json');  // Responding with JSON might not make sense here, so it's handled as an unsupported response.
      } else if (accept.includes('text/html') && !accept.includes('application/json')) {
          res.set('Content-Type', 'text/html');
      } else if (!accept.includes('text/html') && accept.includes('application/json')) {
          res.set('Content-Type', 'application/json');
      } else {
          res.end(); // Terminate the response without sending a body
      }
  });


  router.route('/actuators')
  .get(function (req, res, next) {
      const accept = req.headers.accept || 'application/json';
      const qualityFactors = QualityFactors.parseQualityFactors(accept);
      const actuators = resources.pi.actuators;

      if (qualityFactors['application/json'] > qualityFactors['text/html']) {
          res.json(actuators);
      } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
          res.send(`
              <html>
              <body>
                  <h1>Actuators</h1>
                  <ul>
                      <li><a href="/pi/actuators/ledpir">PIR Actuator</a></li>
                      <li><a href="/pi/actuators/ledldr">LDR Actuator</a></li>
                  </ul>
                  <a href="/pi">Back to Home</a>
              </body>
              </html>
          `);
      } 
    //   else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.json(resources);
    //   }
       else if (accept.includes('text/html') && !accept.includes('application/json')) {
          res.send(`
              <html>
              <body>
                  <h1>Actuators</h1>
                  <ul>
                      <li><a href="/pi/actuators/ledpir">PIR Actuator</a></li>
                      <li><a href="/pi/actuators/ledldr">LDR Actuactor</a></li>
                  </ul>
                  <a href="/pi">Back to Home</a>
              </body>
              </html>
          `);
      } else if (!accept.includes('text/html') && accept.includes('application/json')) {
          res.json(actuators);
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
//   else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
//     res.set('Content-Type', 'application/json');
//   } 
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


router.route('/actuators/ledldr')
    .get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
        const ledLdr = resources.pi.actuators.ledldr;

        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(ledLdr);
        } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <html>
                <body>
                    <h1>LDR Light</h1>
                    <p>Name: ${ledLdr.name}</p>
                    <p>Description: ${ledLdr.description}</p>
                    <p>Status: ${ledLdr.value}</p>
                    <a href="/pi/actuators">Back to Actuators</a>
                </body>
                </html>
            `);
        } 
        // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
        //     res.json(resources);
        // }
         else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <html>
                <body>
                    <h1>LDR Light</h1>
                    <p>Name: ${ledLdr.name}</p>
                    <p>Description: ${ledLdr.description}</p>
                    <p>Status: ${ledLdr.value}</p>
                    <a href="/pi/actuators">Back to Actuators</a>
                </body>
                </html>
            `);
        } else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.json(ledLdr);
        } else {
            // Default response in case none of the conditions are met
            res.json(ledLdr);
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
    // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.set('Content-Type', 'application/json');
    // }
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


router.route('/actuators/ledpir')
    .get(function (req, res, next) {
        const accept = req.headers.accept || 'application/json';
        const qualityFactors = QualityFactors.parseQualityFactors(accept);
        const ledPir = resources.pi.actuators.ledpir;

        if (qualityFactors['application/json'] > qualityFactors['text/html']) {
            res.json(ledPir);
        } else if (qualityFactors['application/json'] < qualityFactors['text/html']) {
            res.send(`
                <html>
                <body>
                    <h1>PIR Light</h1>
                    <p>Name: ${ledPir.name}</p>
                    <p>Description: ${ledPir.description}</p>
                    <p>Status: ${ledPir.value}</p>
                    <a href="/pi/actuators">Back to Actuators</a>
                </body>
                </html>
            `);
        } 
        // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
        //     res.json(resources);
        // } 
        else if (accept.includes('text/html') && !accept.includes('application/json')) {
            res.send(`
                <html>
                <body>
                    <h1>PIR Light</h1>
                    <p>Name: ${ledPir.name}</p>
                    <p>Description: ${ledPir.description}</p>
                    <p>Status: ${ledPir.value}</p>
                    <a href="/pi/actuators">Back to Actuators</a>
                </body>
                </html>
            `);
        } else if (!accept.includes('text/html') && accept.includes('application/json')) {
            res.json(ledPir);
        } else {
            // Default response in case none of the conditions are met
            res.json(ledPir);
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
    // else if (qualityFactors['application/json'] == qualityFactors['text/html']) {
    //     res.set('Content-Type', 'application/json');
    // } 
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
module.exports = router;