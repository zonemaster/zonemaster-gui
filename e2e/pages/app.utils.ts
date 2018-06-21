import { element, browser, by, Key } from 'protractor';

export class Utils {
  goToHome() {
    return browser.get('/');
  }

  goTo(link) {
    return browser.get('/' + link);
  }

  setLang(lang) {
    element(by.xpath('//a[@lang="' + lang + '"]')).click();
  }

  activeAdvancedOptions() {
    element(by.css('.switch')).click();
  }

  getPageTitle() {
    return browser.getTitle();
  }

}
