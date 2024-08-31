const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const net = require('net');

const server = http.createServer(app);
const io = socketIo(server);

// Set up camera stream route
app.get('/sensors/camera', (req, res) => {
  // Send a message to the client indicating the stream is available
  res.send('Camera stream is available at /sensors/camera/url');
});

// Serve the camera stream URL
app.get('/sensors/camera/url', (req, res) => {
  // Replace with the actual URL where the camera stream can be accessed
  const cameraStreamUrl = 'http://192.168.127.60:5000';  // Replace with your camera stream URL
  res.json({ url: cameraStreamUrl });
});

// Handle video streaming via WebSocket
io.on('connection', (socket) => {
  console.log('Client connected for video stream');

  const client = new net.Socket();
  client.connect(5000, '192.168.127.60', () => {
    console.log('Connected to Raspberry Pi camera stream');
  });

  client.on('data', (data) => {
    // Ensure data is in a format clients can handle, e.g., MJPEG
    socket.emit('video-stream', data);
  });

  client.on('error', (err) => {
    console.error('Connection error:', err);
    socket.emit('error', 'Failed to connect to camera stream');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from video stream');
    client.end();
  });
});

// server.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });
