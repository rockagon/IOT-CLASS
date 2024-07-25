var onoff = require ( 'onoff');
var resources = require('./../resources/resources.json');

var Gpio = onoff.Gpio, 
	led1 = new Gpio(20, 'out')

function warning() {
	if (led1.readSync() === 0) { 
        resources.pi.actuators.leds.led1 = true 
        resources.pi.actuators.leds.led2 = false
		led1.writeSync(1);
		console.log ( 'Alert Intrusion, LED1 on');
	}
    else {
        resources.pi.actuators.leds.led2 = true
        resources.pi.actuators.leds.led1 = false
		led1.writeSync(0);
		console.log ( 'Alert Intrusion, LED 2 on');
	}
}

module.exports = {warning}