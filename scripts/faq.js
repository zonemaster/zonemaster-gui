const https = require('https');
const fs = require('fs');
const showdown = require('showdown');

const dir_base = './docs/FAQ/';

const markdown_to_html = (text) => {
  const faqHref = {
    type: 'output',
    regex: new RegExp('href="#', 'g'),
    replace: 'href="./faq#'
  }
  const converter = new showdown.Converter({
    extensions: [faqHref],
    noHeaderId: true // important to add this, else regex match doesn't work
  });

  const html = converter.makeHtml(text);
  return html;
};

const getFaq = (filename) => {
  var file = fs.createWriteStream(`./src/assets/faqs/${filename.split('.')[0]}.html`);
  fs.readFile(dir_base + filename, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const html = markdown_to_html(data);
    file.write(html);
    file.end;
  });
};

fs.readdir(dir_base, (err, files) => {
  files.forEach(filename => {
    getFaq(filename);
  });
});
