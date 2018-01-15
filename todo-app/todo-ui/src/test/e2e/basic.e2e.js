const host = process.env.APPLICATION_BASE_URL || "http://localhost:3000";


describe('TODO Demo App', () => {
  beforeEach(() => {
    browser.get(`${host}/`);
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Todo React App');
  });

  it('should be in test mode', () => {
    expect(element(by.css('.test-mode-form')).isPresent()).toBeTruthy();
  })
});
