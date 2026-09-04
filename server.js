import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const distPath = path.join(__dirname, 'dist');

// If dist directory or index.html is missing (e.g. if Render build command was just 'npm install'),
// build the project automatically on boot so 404 never occurs.
if (!fs.existsSync(path.join(distPath, 'index.html'))) {
  console.log('dist/index.html not found. Running vite build automatically...');
  try {
    execSync('npx vite build', { stdio: 'inherit' });
  } catch (err) {
    console.error('Automatic build failed:', err);
  }
}

// Serve static files from dist
app.use(express.static(distPath, { maxAge: '1d' }));

// SPA fallback: send index.html for all GET routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build not found. Please ensure "npm run build" runs during deployment.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Shree Hari Jewellers server is live on port ${PORT}`);
});
