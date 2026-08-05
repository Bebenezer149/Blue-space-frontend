// Use same-origin API calls on Vercel to avoid cross-origin issues.
// Map in Vercel to an API route at: /api/*
export const API_URL = (import.meta.env.VITE_API_URL || "https://makola-2.onrender.com/api").replace(/\/$/, "");

