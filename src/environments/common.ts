// Common values for all environments
// You can override those in environment configuration files

export const common = {
  contactAddress: 'contact@zonemaster.net',
  logoUrl: 'assets/images/zonemaster_logo_2021_color.png',
  footerLogo: '',
  footerLogoAlt: '',
  defaultLanguage: 'en',
  languages: {
    'da': 'Dansk',
    'en': 'English',
    'es': 'Español',
    'fi': 'Suomi',
    'fr': 'Français',
    'nb': 'Norsk (bokmål)',
    'sl': 'Slovenščina',
    'sv': 'Svenska'
  },
  enabledLanguages: [ 'da', 'en', 'es', 'fi', 'fr', 'nb', 'sl', 'sv' ],
  configUrl: 'assets/app.config.json',
  pollingInterval: 5 * 1000,
}
