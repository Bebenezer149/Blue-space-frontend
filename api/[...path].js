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
    return res.status(204).set(corsHeaders()).end();
  }

  try {
    const apiPath = getWildcardPath(req);
    const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const targetUrl = `${BACKEND_API}/${apiPath}${query}`;

    const headers = { ...req.headers };
    delete headers.host;

    // Forward body as-is for non-GET methods.
    // For JSON requests, Vercel already parses to object; fetch can send object.
    // For multipart, Vercel typically provides raw body only in more advanced configs.
    // This proxy is primarily to unblock CORS for JSON endpoints.
    const body = method === 'GET' || method === 'HEAD' ? undefined : req.body;

    const backendRes = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const contentType = backendRes.headers.get('content-type') || '';
    const isTextual = contentType.includes('application/json') || contentType.startsWith('text/');

    res.status(backendRes.status);
    res.set(corsHeaders());

    backendRes.headers.forEach((value, key) => {
      const lk = key.toLowerCase();
      if (!['transfer-encoding', 'content-length'].includes(lk)) {
        res.setHeader(key, value);
      }
    });

    if (isTextual) {
      const text = await backendRes.text();
      return res.send(text);
    }

    // For binary responses, fall back to arrayBuffer without referencing Buffer.
    const ab = await backendRes.arrayBuffer();
    return res.status(backendRes.status).send(new Uint8Array(ab));

  } catch (e) {
    console.error(e);
    res.status(502).set(corsHeaders()).json({ message: 'Unable to reach API server.' });
  }
}

