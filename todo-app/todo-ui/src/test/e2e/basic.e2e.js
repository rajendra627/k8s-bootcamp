const host = process.env.APPLICATION_BASE_URL || "http://localhost:3000";


describe('TODO Demo App', function() {
  it('should have a title', function() {
    browser.get(`${host}/`);

    expect(browser.getTitle()).toEqual('Todo React App');
  });
});
