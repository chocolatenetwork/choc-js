describe('chocolate-front-end', () => {
  beforeEach(() => cy.visit('/'));

  it('should connect to api', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome chocolate-front-end');
    const getMain = () => cy.get('[data-test-id="test-api-main"]');
    getMain().get('h1').contains('Api Stats:');

    getMain().get('button').contains('Test Api').click();
    getMain().get('p').contains('Api is Ready');
  });
});
