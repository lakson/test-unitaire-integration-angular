import { UserPage } from './user.po';
import { browser, logging } from 'protractor';

describe('User Page', () => {
  let page: UserPage;

  beforeEach(() => {
    page = new UserPage();
  });

  it('user addition', () => {
    page.navigateTo();
    page.setNewUser('Piyumi');
    page.clickAddUser();

    expect(page.getUsersList()).toEqual('Piyumi');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});