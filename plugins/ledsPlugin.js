var onoff = require ( 'onoff');
var resources = require('../resources/resources.json');

var Gpio = onoff.Gpio, 
	led1 = new Gpio(20, 'out'),
	led2 = new Gpio(21, 'out')
var interval1 = null;

function warning() {
	if (led1.readSync() === 0) { 
        resources.pi.actuators.leds.led1 = true 
        resources.pi.actuators.leds.led2 = false
		led1.writeSync(1);
		led2.writeSync(0);
		console.log ( 'Alert Intruision');
	}
    else {
        resources.pi.actuators.leds.led2 = true
        resources.pi.actuators.leds.led1 = false
		led1.writeSync(0);
		led2.writeSync(1);
		console.log ( 'Alert Intruision');
	}
}
process.on('SIGINT', alert_Off); //To turn the alert off by pressing Ctrl+C

exports.module = {
    warning
}
