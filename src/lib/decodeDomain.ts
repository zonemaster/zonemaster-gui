import punycode from 'punycode/punycode.js';

function decodeLabel(label: string): string {
    if (!/^xn--/i.test(label)) {
        return label;
    }

    try {
        const asciiLabel = label.toLowerCase();
        const unicodeLabel = punycode.toUnicode(asciiLabel);

        // Round-trip through the URL parser to reject invalid decoded labels.
        const { hostname } = new URL(`http://${unicodeLabel}.example`);

        return hostname === `${asciiLabel}.example` ? unicodeLabel : label;
    } catch {
        return label;
    }
}

export function decodeDomain(domain: string): string {
    return domain.split('.').map(decodeLabel).join('.');
}
