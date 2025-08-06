import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add this entire 'server' block to proxy API requests
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Your backend Flask server
        changeOrigin: true,
      },
    }
  }
})