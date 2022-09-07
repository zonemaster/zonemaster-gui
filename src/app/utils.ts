// Remove trailing spaces and dots, and leading spaces
export function sanitizeDomain(domain: string): string {
  domain = domain.trim();
  if (domain == '.') {
    return domain;
  } else {
    return domain.replace(/\.$/, '');
  }
}
