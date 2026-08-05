const configuredApiUrl = (
  import.meta.env.VITE_API_URL || "https://makola-2.onrender.com/api"
).replace(/\/+$/, "");

// Laravel routes defined in routes/api.php are always prefixed with /api.
// This guards against a production VITE_API_URL that omits that suffix.
export const API_URL = configuredApiUrl.endsWith("/api")
  ? configuredApiUrl
  : `${configuredApiUrl}/api`;

