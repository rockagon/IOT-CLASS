var Gpio = require('onoff').Gpio;

//var led1 = new Gpio(532, 'out')
var pir = new Gpio(17, 'in', 'both');
//var resources = require('./../resources/resources.json');
var interval1 = null;

function alert_Off() { 
	//  resources.pi.actuators.leds.led1 = false
	  clearInterval(interval1);
	  led1.writeSync(0); 
	  led1.unexport(); 
	  process.exit(); 
    }

pir.watch(function (err, value) {
	if (err) { 
		console.log('Error');
		exit(err);
	}  //In case of error of PIR
	else if (value) {
		console.log("PIR value is: " , value)
	   if (interval1) {clearInterval(interval1);} //To clear interval1 each time to keep blinking interval same
	   setInterval(() => {
		led1.writeSync(1);
	}, 500);  
	}
	}
   )

   //alert_Off()

//console.log("Rock")