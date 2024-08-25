
const Lcd = require('lcd');
const Gpio = require('onoff').Gpio; // Include the onoff to interact with the GPIO
const ldr = require('./ldr');
const pir = require('./pir');
const temp = require('./temp');

// Initialize the LCD with the pin numbers for RS, E, D4, D5, D6, D7
const lcd = new Lcd({
  rs: 519,    // GPIO7
  e: 520,     // GPIO8
  data: [537, 536, 535, 530], // GPIO25, GPIO24, GPIO23, GPIO18
  cols: 16, // Number of columns in LCD
  rows: 2   // Number of rows in LCD
});

// Function to write to the LCD
function writeToLcd(lines, callback) {
  lcd.clear(err => {
    
    if (err) {
      throw err;
      console.log('LCD Error');
    }
    lcd.setCursor(0, 0);
    lcd.print(lines[0], err => {
      if (err) {
        throw err;
        console.log('LCD Error');
      }
      lcd.setCursor(0, 1);
      lcd.print(lines[1], err => {
        if (err) {
          throw err;
          console.log('LCD Error');
        }
        callback();
      });
    });
  });
}

// Initialize the LCD and print sensor values
lcd.on('ready', () => {
  setInterval(() => {
    // Directly get the sensor values
    const temperature = temp.getTempValue();
    const humidity = temp.getHumdValue();
    const pirValue = pir.getPirValue();
    const ldrValue = ldr.getLdrValue();

    // Format the lines for the LCD
    const line1 = `T:${temperature}C H:${humidity}%`;
    const line2 = `PIR:${pirValue} LDR:${ldrValue}`;
    
    // Write to the LCD
    writeToLcd([line1, line2], () => {
      console.log('Sensor values displayed on LCD');
    });
  }, 1000);
});

// When exiting, clear the LCD
process.on('SIGINT', () => {
  lcd.clear();
  lcd.close();
  process.exit();
});
