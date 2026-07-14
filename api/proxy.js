import express from 'express';

// On Node 18+, global fetch exists.
/* global process, Buffer */
const BACKEND_API = process.env.BACKEND_API || 'https://makola-2.onrender.com/api';

const app = express();

// Accept JSON + urlencoded (most requests might not be multipart here, but keep compatibility)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

// Capture raw body as bytes.
app.use((req, res, next) => {
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    req.rawBody = Buffer.concat(chunks);
    next();
  });
});

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  if (req.method === 'OPTIONS') return res.status(204).send('');
  next();
});

app.all('/api/*', async (req, res) => {
  try {
    const apiPath = req.params[0] || '';
    const queryIndex = req.originalUrl.indexOf('?');
    const query = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : '';

    const url = `${BACKEND_API}/${apiPath}${query}`;

    const headers = { ...req.headers };
    delete headers.host;
    delete headers['content-length'];

    const response = await fetch(url, {
      method: req.method,
      headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.rawBody,
    });

    const contentType = response.headers.get('content-type') || '';
    const isTextual = contentType.includes('application/json') || contentType.startsWith('text/');

    const buf = Buffer.from(await response.arrayBuffer());

    res.status(response.status);
    response.headers.forEach((value, key) => {
      const lk = key.toLowerCase();
      if (!['transfer-encoding', 'content-length'].includes(lk)) {
        res.setHeader(key, value);
      }
    });

    res.send(isTextual ? buf.toString('utf8') : buf);
  } catch (e) {
    console.error(e);
    res.status(502).json({ message: 'Unable to reach API server.' });
  }
});

export default app;

