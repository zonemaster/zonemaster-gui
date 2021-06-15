import { element, browser, by } from 'protractor';

export class Utils {
  goToHome() {
    return browser.get('/');
  }

  goTo(link) {
    return browser.get('/' + link);
  }

  setLang(lang) {
    return element(by.xpath('//a[@lang="' + lang + '"]')).click();
  }

  activeOptions() {
    return element(by.css('.switch')).click();
  }

  getPageTitle() {
    return browser.getTitle();
  }

  clearBrowserCache() {
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.sessionStorage.clear();');
    browser.driver.manage().deleteAllCookies();
  }

}
