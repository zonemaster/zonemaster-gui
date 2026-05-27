// Lowercase and capitalize
export default function niceName(name: string): string {
    if (!name) {
        return '';
    }

    const [first, ...rest] = name.toLowerCase();

    return first.toUpperCase() + rest.join('');
}
