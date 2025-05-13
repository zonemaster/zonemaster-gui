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

zipDirectory(inputDir, outputZip)
    .then(() => console.log('Zip complete'))
    .catch(err => console.error('Error zipping:', err));
