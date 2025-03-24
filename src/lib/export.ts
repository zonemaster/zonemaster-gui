import type { ResultData, ResultLevel } from '@/lib/client.ts';
import { toASCII } from 'punycode';

const language = 'en';
const header = ['Module', 'Level', 'Message'];

function convertTo(objArray: string | any[], extension: string) {
    const array =
        typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (const indexObj of header) {
        if (extension === 'csv') {
            row += indexObj + ';';
        } else {
            row += indexObj + ' \t';
        }
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 1; i < array.length; i++) {
        let line = '';
        for (const index of header) {
            if (line !== '') {
                if (extension === 'csv') {
                    line += ';';
                } else {
                    line += ' \t';
                }
            }
            line += array[i][index.toLowerCase()].trim();
        }
        str += line + '\r\n';
    }
    return str;
}

function asciiDomain(domain: string): string {
    return toASCII(domain);
}

function exportedName(extension: string, id: string, domain: string): string {
    return `zonemaster_result_${asciiDomain(domain)}_${id}.${extension}`;
}

function saveAs(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
}

function getModuleName(module: string): string {
    return module;
}

function severityLevelNames(level: ResultLevel): string {
    return level.toLowerCase();
}

function formatDate(date: string): string {
    return new Date(date).toLocaleString();
}

export function exportJson(data: ResultData) {
    const blob = new Blob([JSON.stringify(data.results)], {
        type: 'application/javascript',
    });

    saveAs(blob, exportedName('json', data.hash_id, data.params.domain));
}

export function exportHTML(data: ResultData) {
    let tbodyContent = '';
    for (let item of data.results) {
        tbodyContent += `
        <tr>
          <td>${getModuleName(item.module)}</td>
          <td>${severityLevelNames(item.level)}</td>
          <td>${item.message}</td>
        </tr>
      `;
    }

    const result = `
      <!doctype html>
      <html lang="${language}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
          <title>${data.params.domain} • Zonemaster Test Result</title>
          <style>
            th,td {
              text-align: left;
              font-weight: normal;
              padding: 0.75rem;
            }
            thead {
              background-color: #212529;
              color: #fff;
            }
            body td {
              border-top: 1px solid #dee2e6;
            }
            body {
              color: #212529;
              font-family: sans;
              margin-left: 20px;
            }
            table {
              border: none;
            }
            tbody tr:nth-child(odd) {
              background-color: rgba(0,0,0,.05);
            }
            h2 {
              font-weight: normal;
              font-size: 2rem;
              margin: .5rem 0;
            }
          </style>
        </head>
        <body>
          <header>
            <h2>${data.params.domain}</h2><i>${formatDate(data.created_at)}</i>
          </header>
          <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th scope="col">Module</th>
                <th scope="col">Level</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              ${tbodyContent}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([result], {
        type: 'text/html;charset=utf-8',
    });

    saveAs(blob, exportedName('html', data.hash_id, data.params.domain));
}

export function exportText(data: ResultData) {
    const csvData = convertTo([...data.results].slice(0), 'txt');
    const blob = new Blob([csvData], {
        type: 'text/plain;charset=utf-8',
    });

    saveAs(blob, exportedName('txt', data.hash_id, data.params.domain));
}

export function exportCSV(data: ResultData) {
    const csvData = convertTo([...data.results].slice(0), 'csv');
    const blob = new Blob([csvData], {
        type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, exportedName('csv', data.hash_id, data.params.domain));
}
