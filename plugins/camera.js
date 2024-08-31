// plugins/camera.js
const { spawn } = require('child_process');
const EventEmitter = require('events');

class CameraStream extends EventEmitter {
  constructor() {
    super();
    this.clients = [];
    this.startStream();
  }

  startStream() {
    // Spawn the libcamera-vid process
    this.libcameraProcess = spawn('libcamera-vid', [
      '--inline',
      '-t',
      '0',
      '--codec',
      'h264',
      '--bitrate',
      '2000000',
      '-o',
      '-', // Output to stdout
      '--width',
      '1280',
      '--height',
      '720',
      '--framerate',
      '25',
      '--profile',
      'baseline',
    ]);

    // Spawn ffmpeg to convert H264 to HLS
    this.ffmpegProcess = spawn('ffmpeg', [
      '-i',
      'pipe:0',
      '-c:v',
      'copy',
      '-f',
      'hls',
      '-hls_time',
      '1',
      '-hls_list_size',
      '5',
      '-hls_flags',
      'delete_segments',
      '/dev/stdout',
    ]);

    // Pipe libcamera-vid output to ffmpeg input
    this.libcameraProcess.stdout.pipe(this.ffmpegProcess.stdin);

    // Handle ffmpeg output
    this.ffmpegProcess.stdout.on('data', (data) => {
      this.clients.forEach((res) => {
        res.write(data);
      });
    });

    this.ffmpegProcess.stderr.on('data', (data) => {
      console.error(`ffmpeg stderr: ${data}`);
    });

    this.libcameraProcess.stderr.on('data', (data) => {
      console.error(`libcamera-vid stderr: ${data}`);
    });

    this.libcameraProcess.on('error', (err) => {
      console.error('Error starting libcamera-vid:', err);
      this.emit('error', err);
    });

    this.ffmpegProcess.on('error', (err) => {
      console.error('Error starting ffmpeg:', err);
      this.emit('error', err);
    });

    this.libcameraProcess.on('exit', (code, signal) => {
      console.error(`libcamera-vid exited with code ${code} and signal ${signal}`);
      this.emit('exit', { code, signal });
    });

    this.ffmpegProcess.on('exit', (code, signal) => {
      console.error(`ffmpeg exited with code ${code} and signal ${signal}`);
      this.emit('exit', { code, signal });
    });
  }

  addClient(res) {
    // Set appropriate headers for HLS stream
    res.writeHead(200, {
      'Content-Type': 'application/vnd.apple.mpegurl',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
    });

    this.clients.push(res);
    console.log(`Client connected. Total clients: ${this.clients.length}`);

    // Remove client on close
    res.on('close', () => {
      this.clients = this.clients.filter((client) => client !== res);
      console.log(`Client disconnected. Total clients: ${this.clients.length}`);
      if (this.clients.length === 0) {
        // No clients left, stop the stream
        this.stopStream();
      }
    });
  }

  stopStream() {
    if (this.libcameraProcess) {
      this.libcameraProcess.kill();
      this.libcameraProcess = null;
    }
    if (this.ffmpegProcess) {
      this.ffmpegProcess.kill();
      this.ffmpegProcess = null;
    }
    console.log('Camera and ffmpeg processes killed due to no clients.');
  }
}

const cameraStream = new CameraStream();

module.exports = cameraStream;
