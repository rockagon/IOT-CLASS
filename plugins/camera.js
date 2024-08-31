const net = require('net');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('Client connected for video stream');

    const client = new net.Socket();
    client.connect(5000, 'RASPBERRY_PI_IP', () => {
      console.log('Connected to Raspberry Pi camera stream');
    });

    client.on('data', (data) => {
      socket.emit('video-stream', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from video stream');
      client.end();
    });
  });
};
