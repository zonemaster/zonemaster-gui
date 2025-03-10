// Lowercase and capitalize
export default function niceName(name: string): string {
  const [first, ...rest] = name.toLowerCase();

  return first.toUpperCase() + rest.join('');
}
