import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { readFileSync } from 'fs';

// Read package.json to get version
const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url))
);

export async function zipDirectory(sourceDir, outPath) {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            console.log(`Zipped ${archive.pointer()} total bytes`);
            resolve();
        });

        archive.on('error', err => reject(err));

        archive.pipe(output);
        archive.directory(sourceDir, false); // `false` keeps only folder contents
        archive.finalize();
    });
}

// Example usage
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputDir = path.resolve(__dirname, '../public');
const version = packageJson.version;
const outputZip = path.resolve(__dirname, `../zonemaster_web_gui_${version}.zip`);

// Copy zonemaster.conf-example into public
const file1Src = path.resolve(__dirname, '../zonemaster.conf-example');
const file1Dest = path.resolve(inputDir, 'zonemaster.conf-example');
fs.copyFileSync(file1Src, file1Dest);
console.log('Include zonemaster.conf-example in distribution zip file');

// Copy LICENSE into public
const file2Src = path.resolve(__dirname, '../LICENSE');
const file2Dest = path.resolve(inputDir, 'LICENSE');
fs.copyFileSync(file2Src, file2Dest);
console.log('Include LICENSE in distribution zip file');

zipDirectory(inputDir, outputZip)
    .then(() => console.log('Zip complete'))
    .catch(err => console.error('Error zipping:', err));
