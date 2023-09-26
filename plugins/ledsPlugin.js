var onoff = require ( 'onoff');
var Gpio = onoff.Gpio, 
	led1 = new Gpio(20, 'out'),
	led2 = new Gpio(21, 'out')
var interval1 = null;

function warming() {
	if (led1.readSync() === 0) {
		led1.writeSync(1);
		led2.writeSync(0);
		console.log ( 'Alert Intruision');
	}
    else {
		led1.writeSync(0);
		led2.writeSync(1);
		console.log ( 'Alert Intruision');
	}
}
function alert_Off() { 
	clearInterval(interval1);
	led1.writeSync(0); 
	led1.unexport(); 
	led2.writeSync(0); 
	led2.unexport();
	console.log('End warming')
	process.exit(); 
}
process.on('SIGINT', alert_Off); //To turn the alert off by pressing Ctrl+C

exports.module = {
    warming, alert_Off
}
