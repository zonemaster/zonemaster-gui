const fs = require('fs');

fs.readdir('./share/dist/en', (err, files) => {
    const manifest = {
        styles: [],
        scripts: [],
    };

    files.forEach(file => {
        if (file.endsWith('.css')) {
            manifest.styles.push(file);
        } else if(file.endsWith('.js')) {
            manifest.scripts.push(file);
        }
    });


    fs.writeFile('./share/manifest.json', JSON.stringify(manifest), err => {
        if (err) {
            console.error(err)
        } else {
            console.log('manifest.json written')
        }
    })
  });
