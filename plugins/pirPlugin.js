var onoff = require ( 'onoff');
var Gpio = onoff.Gpio
led1 = new Gpio(20, 'out')
led2 = new Gpio(21, 'out')
pir = new Gpio(17, 'in', 'both');
var ledsPlugin = require("./ledsPlugin");
var resources = require('./../resources/resources.json');
var interval1 = null;


pir.watch(function (err, value) {
	if (err) { exit(err);}  //In case of error of PIR
	else if (value) {
	   if (interval1) { clearInterval(interval1);} //To clear interval1 each time to keep blinking interval same
	   interval1 = setInterval(ledsPlugin.warning , 1000)
	   console.log("PIR value is: " , value)
	}
	setTimeout(alert_Off, 10000000) //To stop the warning after 30s
	}
   )
   function alert_Off() { 
	clearInterval(interval1)
	led1.writeSync(0)
	led2.writeSync(0) 
	led1.unexport()
	led2.unexport()
	console.log('No warning')
	resources.pi.actuators.leds.led2 = false
    resources.pi.actuators.leds.led1 = false
	process.exit(); 
   }
   