import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin pour servir les images/vidéos depuis Frontend/Images/ sans avoir besoin du backend
function serveLocalImages() {
  const imagesDir = path.join(__dirname, 'Images');
  const mimeTypes = {
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.webp': 'image/webp',
    '.svg':  'image/svg+xml',
    '.mp4':  'video/mp4',
    '.mov':  'video/quicktime',
    '.avi':  'video/x-msvideo',
  };

  return {
    name: 'serve-local-images',
    configureServer(server) {
      server.middlewares.use('/images', (req, res, next) => {
        const fileName = decodeURIComponent((req.url || '/').replace(/^\//, ''));
        const filePath = path.join(imagesDir, fileName);
        try {
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'max-age=86400');
            res.setHeader('Accept-Ranges', 'bytes');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        } catch {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveLocalImages()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
      // /images n'est plus proxifié vers le backend — servi localement
    }
  }
});
