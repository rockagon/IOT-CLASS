var Gpio = require('onoff').Gpio;
// var Gpio = onoff

var led1 = new Gpio(532, 'out')
var pir = new Gpio(529, 'in', 'both');
//var resources = require('./../resources/resources.json');
var interval1 = null;


function warning() {
	if (led1.readSync() === 0) { 
       // resources.pi.actuators.leds.led1 = true 
	   console.log ( 'Alert Intrusion');	
	   led1.writeSync(1);
		
	}
    else {
       // resources.pi.actuators.leds.led2 = true
	   console.log ( 'Alert Intrusion');	
	   led1.writeSync(0);
		
	}
}

function alert_Off() { 
  //  resources.pi.actuators.leds.led1 = false
	clearInterval(interval1);
	led1.writeSync(0); 
	led1.unexport(); 
	console.log('End warning')
	process.exit(); 
}

pir.watch(function (err, value) {
	if (err) { exit(err);}  //In case of error of PIR
	else if (value) {
	   if (interval1) { clearInterval(interval1);} //To clear interval1 each time to keep blinking interval same
	   interval1 = setInterval(warning(), 1000);	
	   console.log("PIR value is: " , value)
	   resources.pi.sensors.pirs.pir1.value = true
	}
	else if (!value) {
		if (interval1) { clearInterval(interval1);} //To clear interval1 each time to keep blinking interval same
		//interval1 = setInterval(warning(), 1000);	
		console.log("PIR value is no value ")
		resources.pi.sensors.pirs.pir1.value = true
	 }
	setTimeout(alert_Off , 30000) // To turn the alert off after 30s
   }
   )

console.log("Rock")