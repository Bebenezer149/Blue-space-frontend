import { API_URL } from "./config";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status}). Please try again.`;
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("first_name");
      localStorage.removeItem("slug");
    }
    throw new Error(message);
  }

  return data;
}
