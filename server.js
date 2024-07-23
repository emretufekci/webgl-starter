const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const selfsigned = require('selfsigned');
require('dotenv').config();

const app = express();

// Get the directory path from the environment variable or use the default path
const buildWebGLDir = process.env.BUILD_WEBGL_DIR || path.join(__dirname, 'Build-WebGL');

// Middleware to set the correct content-encoding headers
app.use((req, res, next) => {
  if (req.url.endsWith('.br')) {
    res.setHeader('Content-Encoding', 'br');
    res.setHeader('Content-Type', 'application/javascript');
  } else if (req.url.endsWith('.gz')) {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Serve static files from the 'Build' directory
app.use('/Build', express.static(path.join(buildWebGLDir, 'Build')));
app.use('/TemplateData', express.static(path.join(buildWebGLDir, 'TemplateData')));

// Fallback for serving index.html for single-page applications
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildWebGLDir, 'index.html'));
});

const PORT = process.env.PORT || 8080;
const SSL_PORT = process.env.SSL_PORT || 8443;

// Check if SSL certificates exist, if not generate self-signed ones
const certPath = path.join(__dirname, 'cert.pem');
const keyPath = path.join(__dirname, 'key.pem');

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  const attrs = [{ name: 'commonName', value: 'localhost' }];
  const pems = selfsigned.generate(attrs, {
    days: 365,
    keySize: 2048 // Set key size to 2048 bits
  });

  fs.writeFileSync(certPath, pems.cert);
  fs.writeFileSync(keyPath, pems.private);
}

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

console.log(`🚀 Serving Build-WebGL directory from: ${buildWebGLDir}\n`);


https.createServer(options, app).listen(SSL_PORT, () => {
  console.log(' ----------------------------------');
  console.log(`🔒 HTTPS Server is listening on https://localhost:${SSL_PORT}`);
  console.log(' ----------------------------------\n');

});

app.listen(PORT, () => {
  console.log(' ----------------------------------');
  console.log(`🔓 HTTP Server listening on http://localhost:${PORT}`);
  console.log(' ----------------------------------\n');
  console.log(`👨‍💻 This project made by: https://github.com/emretufekci`);
});
