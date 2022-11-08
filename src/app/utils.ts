// Remove trailing and leading spaces
// Remove trailing dot
// Convert to lower case
export function sanitizeDomain(domain: string): string {
  domain = domain.trim().toLowerCase();
  if (domain == '.') {
    return domain;
  } else {
    return domain.replace(/\.$/, '');
  }
}
