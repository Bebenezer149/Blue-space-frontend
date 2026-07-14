// Vercel wildcard proxy route
// Maps: /api/*  -> backend /api/*

const BACKEND_API = 'https://makola-2.onrender.com/api';

function getWildcardPath(req) {
  // Vercel provides wildcard segments in req.query.path
  const p = req.query?.path;
  if (!p) return '';
  return Array.isArray(p) ? p.join('/') : p;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
  };
}

export default async function handler(req, res) {
  const method = (req.method || 'GET').toUpperCase();

  // Preflight
  if (method === 'OPTIONS') {
    const ch = corsHeaders();
    for (const [k, v] of Object.entries(ch)) res.setHeader(k, v);
    return res.status(204).end();
  }

  try {

    const apiPath = getWildcardPath(req);
    const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const targetUrl = `${BACKEND_API}/${apiPath}${query}`;

    const headers = { ...req.headers };

    // Hop-by-hop + computed headers can break Undici's strict request handling.
    delete headers.host;
    delete headers.connection;
    delete headers['transfer-encoding'];

    // Remove content-length regardless of casing.
    for (const key of Object.keys(headers)) {
      if (key.toLowerCase() === 'content-length') delete headers[key];
    }

    // Normalize body to a type Undici can measure accurately.
    let body;
    if (method !== 'GET' && method !== 'HEAD') {
      const contentType = headers['content-type'] || headers['Content-Type'] || '';

      if (contentType.includes('application/json') && req.body && typeof req.body === 'object' && !(req.body instanceof ArrayBuffer) && !(ArrayBuffer.isView(req.body)) ) {
        body = JSON.stringify(req.body);
        // Ensure Content-Type is set for the JSON string.
        headers['content-type'] = 'application/json';
      } else {
        body = req.body;
      }
    }

    const backendRes = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const contentType = backendRes.headers.get('content-type') || '';
    const isTextual = contentType.includes('application/json') || contentType.startsWith('text/');

    res.statusCode = backendRes.status;
    for (const [k, v] of Object.entries(corsHeaders())) res.setHeader(k, v);


    backendRes.headers.forEach((value, key) => {
      const lk = key.toLowerCase();
      if (!['transfer-encoding', 'content-length'].includes(lk)) {
        res.setHeader(key, value);
      }
    });

    if (isTextual) {
      const text = await backendRes.text();
      res.status(backendRes.status);
      return res.send(text);
    }


    // For binary responses, send bytes without referencing Buffer.
    const ab = await backendRes.arrayBuffer();
    res.status(backendRes.status);
    return res.send(new Uint8Array(ab));



  } catch (e) {
    console.error(e);
    const ch = corsHeaders();
    for (const [k, v] of Object.entries(ch)) res.setHeader(k, v);
    return res.status(502).json({ message: 'Unable to reach API server.' });
  }

}

