// plugins/camera.js
const { spawn } = require('child_process');

const startCameraStream = (res) => {
  // Use libcamera to start streaming
  const libcameraProcess = spawn('libcamera-vid', ['--inline', '-t', '0', '-o', '-', '--width', '640', '--height', '480']);

  // Set the response headers to indicate a video stream
  res.setHeader('Content-Type', 'video/mjpeg');

  // Pipe the stdout of the libcamera process to the response
  libcameraProcess.stdout.pipe(res);

  // Handle process errors
  libcameraProcess.on('error', (err) => {
    console.error('Error starting camera stream:', err);
    res.status(500).send('Error starting camera stream');
  });

  // Handle process exit
  libcameraProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`libcamera-vid process exited with code ${code}`);
    }
  });
};

module.exports = { startCameraStream };
