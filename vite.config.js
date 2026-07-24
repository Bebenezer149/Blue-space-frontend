import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import flowbiteReact from "flowbite-react/plugin/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Manual deployment: proxy disabled by default.
    // Configure your own API routing externally (or add a proxy for local dev).
    proxy: {},
  },
})