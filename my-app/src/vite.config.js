import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:8080', // Spring Boot backend
        changeOrigin: true,
        rewrite: path => path,           // keep the same path
      },
    },
  },
});
