import { browser, by, element } from 'protractor';

export class UserPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  setNewUser(user: string) {
    element(by.id('newUser')).sendKeys(user);
  }

  clickAddUser() {
    element(by.id('addUserBtn')).click();
  }

  getUsersList() {
    return element.all(by.css('.userList li')).last().getText();
  }
}