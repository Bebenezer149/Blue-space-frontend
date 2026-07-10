const BACKEND_API = "https://makola-2.onrender.com/api";

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
  const fromFunctionPath = event.path.replace(/^\/\.netlify\/functions\/api\/?/, "");
  if (fromFunctionPath) {
    return fromFunctionPath;
  }

  const fromApiPath = event.path.replace(/^\/api\/?/, "");
  return fromApiPath;
}

exports.handler = async (event) => {
  const apiPath = getApiPath(event);
  const query = event.rawQuery ? `?${event.rawQuery}` : "";
  const targetUrl = `${BACKEND_API}/${apiPath}${query}`;

  const headers = {};
  for (const [key, value] of Object.entries(event.headers || {})) {
    if (!SKIP_REQUEST_HEADERS.has(key.toLowerCase())) {
      headers[key] = value;
    }
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

  try {
    const response = await fetch(targetUrl, fetchOptions);
    const body = Buffer.from(await response.arrayBuffer());

    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "transfer-encoding") {
        responseHeaders[key] = value;
      }
    });

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: body.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("API proxy error:", error);

    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Unable to reach API server." }),
    };
  }
};
