// Allow overriding the API base at build time with `VITE_API_BASE`.
// Use the provided Vercel production URL when built for production, otherwise localhost.
export const API_BASE = import.meta.env.VITE_API_BASE || (
  import.meta.env.PROD
    ? "https://driving-web-f8ee3qggn-noursanehs-projects.vercel.app/"
    : "http://localhost:5174"
);
