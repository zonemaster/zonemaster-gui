const path = require('path');
const express = require('express');

const DIST_DIR = path.resolve(__dirname, '../dist');

const app = express();

app.use(express.static(DIST_DIR));

app.get('/:lang/*', (req, res) => {
  const lang = req.params.lang;
  if (!lang.match(/[a-z]{2}/)) {
    return res.sendStatus(404);
  }

  res.sendFile(path.join(DIST_DIR, `${lang}/index.html`));
});

app.get('/', (req, res) => {
  res.redirect('/en');
})

app.listen(4201, () => {
  console.log('Starting test server...')
});
