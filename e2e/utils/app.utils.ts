import { element, browser, by, ExpectedConditions, $ } from 'protractor';

export class Utils {
  goToHome() {
    return browser.get('/');
  }

  goTo(link) {
    return browser.get('/' + link);
  }

  setLang(lang) {
    return element(by.xpath('//a[@lang="' + lang + '"]')).click()
      .then(() => browser.wait(ExpectedConditions.presenceOf($(`.lang > div > a.selected[lang="${lang}"]`)), 10000));
  }

  activeOptions() {
    return element(by.css('.switch')).click();
  }

  getPageTitle() {
    return browser.getTitle();
  }

  clearBrowserCache() {
    return Promise.all([
      browser.executeScript('window.localStorage.clear();'),
      browser.executeScript('window.sessionStorage.clear();'),
      browser.driver.manage().deleteAllCookies(),
    ])
  }

}
