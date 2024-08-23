
var Gpio = require('onoff').Gpio;

    var led2 = new Gpio(533, 'out'); // GPIO21
    var ldr = new Gpio(539, 'in', 'both'); // GPIO27
    var interval2 = null;
    var ldrValue = 0;
    var resources = require('./../resources/resources.json');
    
    // Function to check LDR sensor value
    function checkLDR() {
      ldr.read((err, value) => {
        if (err) {
          console.log('Error reading LDR sensor:', err);
          return;
        }
        console.log("LDR value is: ", value);
        ldrValue = value; // Store the value in ldrValue
        if (value) { // Assuming high value indicates darkness
          if (interval2) {
            clearInterval(interval2);
          }
          // Start blinking LED every 2 seconds
          interval2 = setInterval(() => {
            led2.writeSync(led2.readSync() ^ 1); // Toggle LED state
          }, 2000);
          resources.pi.sensors.ldr.value = true
          resources.pi.actuators.ledldr.value = true
        } else {
          // If light is detected, turn off the LED
          if (interval2) {
            clearInterval(interval2);
          }
          led2.writeSync(0);
          resources.pi.sensors.ldr.value = false
          resources.pi.actuators.ledldr.value = false
        }
      });
    }
    
    // Set an interval to check the LDR sensor every 2 seconds
    setInterval(checkLDR, 2000);
    
    // Handle process exit
    process.on('SIGINT', () => {
        clearInterval(interval2);
        led2.writeSync(0);
        led2.unexport();
        ldr.unexport();
        process.exit();
      });
    // Export the LDR value
    module.exports = {
         getLdrValue: () => ldrValue
    };