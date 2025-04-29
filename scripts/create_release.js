import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

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
const outputZip = path.resolve(__dirname, '../public.zip');

zipDirectory(inputDir, outputZip)
    .then(() => console.log('Zip complete'))
    .catch(err => console.error('Error zipping:', err));
