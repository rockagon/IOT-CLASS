var Gpio = require('onoff').Gpio;

var led1 = new Gpio(532, 'out'); // GPIO20
var pir = new Gpio(529, 'in', 'both'); // GPIO17
var pirValue = 0;
var resources = require('./../resources/resources.json');

// Watch for changes in PIR sensor state
pir.watch((err, value) => {
  if (err) {
    console.log('Error watching PIR sensor:', err);
    return;
  }
  pirValue = value; // Store the value in pirValue

  if (value == 1) {
    // Motion detected
    led1.writeSync(1); // Turn on the LED
    console.log("PIR value is: ", value);
    resources.pi.sensors.pir.value = true;
    resources.pi.actuators.ledpir.value = true;

    // Set a timeout to turn off the LED after 3 seconds
    setTimeout(() => {
      led1.writeSync(0); // Turn off the LED
      resources.pi.sensors.pir.value = false;
      resources.pi.actuators.ledpir.value = false;
    }, 3000); // 3000 milliseconds = 3 seconds
  }
});

// Handle process exit
process.on('SIGINT', () => {
  led1.writeSync(0);
  led1.unexport();
  pir.unexport();
  process.exit();
});

// Export the PIR value
module.exports = {
  getPirValue: () => pirValue
};