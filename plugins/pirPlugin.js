var onoff = require ( 'onoff');
var ledsPlugin = require("ledsPlugin.js");
var Gpio = onoff.Gpio, 
    pir = new Gpio(17, 'in', 'both');
var interval1 = null;


pir.watch(function (err, value) {
	if (err) { exit(err);}  //In case of error of PIR
	else if (value) {
	   if (interval1) { clearInterval(interval1);} //To clear interval1 each time to keep blinking interval same
	   interval1 = setInterval(ledsPlugin.warning(), 1000);	
	   resources.pi.sensors.pirs.pir1.value = true
	}
	setTimeout(alert_Off , 30000) // To turn the alert off after 30s
   }
   )
   
function alert_Off() { 
    resources.pi.actuators.leds.led2 = false
    resources.pi.actuators.leds.led1 = false
	clearInterval(interval1);
	led1.writeSync(0); 
	led1.unexport(); 
	led2.writeSync(0); 
	led2.unexport();
	console.log('End warning')
	process.exit(); 
}
process.on('SIGINT', alert_Off()); //To turn the alert off by pressing Ctrl+C