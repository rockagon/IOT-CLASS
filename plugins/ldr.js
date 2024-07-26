var Gpio = require('onoff').Gpio; 
	light1 = new Gpio(532, 'out'),
    ldr = new Gpio(529, 'in', 'both');

ldr.watch(function (err, value) {
    if (err) {
        console.log ('Error');
        exit(err);}  //In case of error of LDR
    else if (value===1) { //darkness fall
       light1.writeSync(1);
       console.log ('Security lights on');
       }
    else if (value===0) { //sunlight raise
       light1.writeSync(0);
       console.log ('Security lights off');
   }
})
//console.log('Rock')