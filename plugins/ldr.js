var onoff = require ('onoff');
var Gpio = onoff.Gpio, 
	light1 = new Gpio(21, 'out'),
    ldr = new Gpio(16, 'in', 'both');

ldr.watch(function (err, value) {
    if (err) {exit(err);}  //In case of error of LDR
    else if (value===1) { //darkness fall
       light1.writeSync(1);
       console.log ('Security lights on');
       }
    else if (value===0) { //sunlight raise
       light1.writeSync(0);
       console.log ('Security lights off');
   }
})