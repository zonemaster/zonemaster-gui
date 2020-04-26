const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('zonemaster_web_gui.zip');
const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
});

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(
        'archiver has been finalized and the output file descriptor has closed.'
    );
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

archive.file('zonemaster.conf-example', { name: 'zonemaster.conf-example' });
archive.directory('dist/', 'dist');

archive.finalize();
