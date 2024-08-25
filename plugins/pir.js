var Gpio = require('onoff').Gpio;

var led1 = new Gpio(532, 'out'); //GPIO20
var pir = new Gpio(529, 'in', 'both'); //GPIO17
var interval1 = null;
var pirValue = 0;
var resources = require('./../resources/resources.json');

// Function to check PIR sensor value
function checkPIR() {
  pir.read((err, value) => {
    if (err) {
      console.log('Error reading PIR sensor:', err);
      return;
    }
    console.log("PIR value is: ", value);
	pirValue = value; // Store the value in pirValue
    if (value==1) {
      if (interval1) {
        clearInterval(interval1);
      }

      if (led1.readSync() === 0) { 
        led1.writeSync(1); // Toggle LED state
      resources.pi.sensors.pir.value = true
      resources.pi.actuators.ledpir.value = true
    } else if (led1.readSync() === 1){
      // If no motion is detected, turn off the LED
      led1.writeSync(0);
      resources.pi.sensors.pir.value = false
      resources.pi.actuators.ledpir.value = false
    }
  }})};

// Set an interval to check the PIR sensor every 2 seconds
setInterval(checkPIR, 1000);

// Handle process exit
process.on('SIGINT', () => {
	clearInterval(interval1);
	led1.writeSync(0);
	led1.unexport();
	pir.unexport();
	process.exit();
  });
  
// Export the LDR value
module.exports = {
	getPirValue: () => pirValue
};