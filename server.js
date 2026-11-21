/**
 * SkyPulse Local Server
 * Zero-dependency static file server with API proxy and fallback mock endpoints.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle API mock endpoints if queried directly
  if (req.url.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.url.startsWith('/api/boarding/flights')) {
      res.end(JSON.stringify([
        { FlightID: 101, FlightNo: 'AI-102', Source: 'DEL', Destination: 'BOM', DepartureTime: new Date().toISOString(), Boarded: 248, Total: 256 }
      ]));
      return;
    }
    if (req.url.startsWith('/api/bookings')) {
      res.end(JSON.stringify([
        { FlightNo: 'AI-102', Source: 'DEL', Destination: 'BOM', DepartureTime: new Date().toISOString(), SeatNo: '12A', PNR: '7KJ89X', Status: 'Confirmed', BoardingStatus: 'Boarded' }
      ]));
      return;
    }
    res.end(JSON.stringify({ ok: true, status: 'operational' }));
    return;
  }

  // Parse path
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Security check: ensure path is inside PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routes
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (err2, content) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

function listen(port) {
  server.listen(port, () => {
    console.log(`✈ SkyPulse server running at http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      listen(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

listen(PORT);
