import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
   devServer: {
  historyApiFallback: {
    index: 'error.html', // default file to serve
    disableDotRule: true, // serve index.html even if URL contains a dot
  },
}
  },
});
