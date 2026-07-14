const BACKEND_API = "https://makola-2.onrender.com/api";

// Netlify Functions provide Node globals, but some eslint setups may complain.
/* global Buffer */
/* eslint-disable no-undef */

const SKIP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "x-forwarded-for",
  "x-forwarded-proto",
  "x-forwarded-port",
  "x-nf-client-connection-ip",
  "x-nf-account-id",
  "x-nf-site-id",
  "x-nf-deploy-context",
  "x-nf-deploy-id",
  "x-nf-geo",
  "x-nf-request-id",
  "client-ip",
]);

function getApiPath(event) {
  // If the path starts with the function route prefix, strip it first.
  let cleanedPath = event.path;
  if (cleanedPath.startsWith("/.netlify/functions/api")) {
    cleanedPath = cleanedPath.slice("/.netlify/functions/api".length);
  }
  // If the remaining path starts with /api, strip it as well.
  if (cleanedPath.startsWith("/api")) {
    cleanedPath = cleanedPath.slice("/api".length);
  }
  // Strip any leading slash to avoid double slashes when joining with BACKEND_API
  if (cleanedPath.startsWith("/")) {
    cleanedPath = cleanedPath.slice(1);
  }
  return cleanedPath;
}

export const handler = async (event) => {
  // CORS preflight headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  const apiPath = getApiPath(event);
  const query = event.rawQuery ? `?${event.rawQuery}` : "";
  const targetUrl = `${BACKEND_API}/${apiPath}${query}`;

  const headers = {};
  for (const [key, value] of Object.entries(event.headers || {})) {
    const lowerKey = key.toLowerCase();
    if (SKIP_REQUEST_HEADERS.has(lowerKey)) continue;

    // Keep Content-Type especially for multipart/form-data with boundary.
    if (lowerKey === "content-type") {
      headers[key] = value;
      continue;
    }

    headers[key] = value;
  }

  const fetchOptions = {
    method: event.httpMethod,
    headers,
  };

  if (event.body && !["GET", "HEAD"].includes(event.httpMethod)) {
    fetchOptions.body = event.isBase64Encoded
      ? Buffer.from(event.body, "base64")
      : event.body;
  }

  // If we already have a content-type (e.g. multipart/form-data),
  // do not let underyling fetch try to auto-set it from other inputs.
  if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD" && !headers["content-type"] && headers["Content-Type"]) {
    headers["content-type"] = headers["Content-Type"];
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);
    const body = Buffer.from(await response.arrayBuffer());

    const responseHeaders = {
      ...corsHeaders,
    };

    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey !== "transfer-encoding" &&
        lowerKey !== "content-encoding" &&
        lowerKey !== "content-length" &&
        lowerKey !== "access-control-allow-origin" &&
        lowerKey !== "access-control-allow-headers" &&
        lowerKey !== "access-control-allow-methods"
      ) {
        responseHeaders[key] = value;
      }
    });

    // Encode body correctly depending on response type.
    // JSON/text should be returned as UTF-8 string, binary as base64.
    const contentType = response.headers.get("content-type") || "";
    const isTextual = contentType.includes("application/json") || contentType.startsWith("text/");

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: isTextual ? body.toString("utf8") : body.toString("base64"),
      isBase64Encoded: !isTextual,
    };
  } catch (error) {
    console.error("API proxy error:", error);

    return {
      statusCode: 502,
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders,
      },
      body: JSON.stringify({ message: "Unable to reach API server." }),
    };
  }
};
