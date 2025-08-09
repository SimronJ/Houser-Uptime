const express = require('express');
const path = require('path');

const app = express();
const rootDir = __dirname;

// Serve the site under the same base path used on GitHub Pages
app.use('/Houser-Uptime', express.static(rootDir, { extensions: ['html'] }));

// Convenience: redirect root to the base path
app.get('/', (_req, res) => {
  res.redirect('/Houser-Uptime/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}/Houser-Uptime/`);
});


