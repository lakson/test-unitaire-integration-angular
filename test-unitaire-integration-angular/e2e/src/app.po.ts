import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  setNewUser(user: string): void {
    element(by.id('newUser')).sendKeys(user);
  }

  clickAddUser(): void {
    element(by.id('addUserBtn')).click();
  }

  getUsersList() {
    return element.all(by.css('.userList li')).last().getText();
  }
}
