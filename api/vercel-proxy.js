// (unused) Previously attempted Vercel proxy. Replaced by api/[...path].js
// Vercel serverless function proxy (deprecated)
// Deploy this file as an API route via Vercel's "api" folder conventions.
// Endpoint: /api/{path*}

export const config = {
  runtime: 'nodejs18.x',
};

const BACKEND_API = process.env.BACKEND_API || 'https://makola-2.onrender.com/api';

function getWildcardPath(req) {
  // Vercel sets `req.query` keys for dynamic routes.
  // Commonly, `{path*}` becomes `req.query.path` (string or array).
  const p = req.query?.path;
  if (!p) return '';
  return Array.isArray(p) ? p.join('/') : p;
}

export default async function handler(req, res) {
  const method = req.method || 'GET';

  // Allow CORS for the frontend origin.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  if (method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const apiPath = getWildcardPath(req);
    const queryString = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const url = `${BACKEND_API}/${apiPath}${queryString}`;

    const headers = { ...req.headers };
    delete headers.host;

    const response = await fetch(url, {
      method,
      headers,
      // For Vercel, body is already parsed for JSON requests.
      // For multipart you typically need special handling.
      // Here we forward JSON as-is.
      body: method === 'GET' || method === 'HEAD' ? undefined : req.body,
    });

    const contentType = response.headers.get('content-type') || '';
    const isTextual = contentType.includes('application/json') || contentType.startsWith('text/');

    res.status(response.status);
    response.headers.forEach((value, key) => {
      const lk = key.toLowerCase();
      if (!['transfer-encoding', 'content-length'].includes(lk)) {
        res.setHeader(key, value);
      }
    });

    if (isTextual) {
      const txt = await response.text();
      return res.send(txt);
    }

    const buf = Buffer.from(await response.arrayBuffer());
    res.send(buf);
  } catch (e) {
    console.error(e);
    return res.status(502).json({ message: 'Unable to reach API server.' });
  }
}

