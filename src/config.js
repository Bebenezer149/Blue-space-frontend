const configuredApiUrl = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"  
).replace(/\/+$/, "");

// Laravel routes defined in routes/api.php are always prefixed with /api.
// This guards against a production VITE_API_URL that omits that suffix.
export const API_URL = configuredApiUrl.endsWith("/api")
  ? configuredApiUrl
  : `${configuredApiUrl}/api`;

