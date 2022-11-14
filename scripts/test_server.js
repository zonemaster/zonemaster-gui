const path = require('path');
const express = require('express');

const DIST_DIR = path.resolve(__dirname, '../dist');

const app = express();

app.use(express.static(DIST_DIR));

app.use('/:lang', (req, res, next) => {
  const lang = req.params.lang;

  if (!lang.match(/^[a-z]{2}$/)) {
    return next();
  }

  res.sendFile(path.join(DIST_DIR, `${lang}/index.html`));
});

app.get('/*', (req, res) => {
  res.redirect('/en' + req.originalUrl);
});

app.listen(4201, () => {
  console.log('Starting test server...')
});
