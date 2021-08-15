describe('Notes app', () => {
  const user = {
    email: Cypress.env('user_email'),
    password: Cypress.env('user_password'),
  };
  const api_url = Cypress.env('api_url');

  beforeEach(() => {
    cy.visit('/');
    cy.request('POST', `${api_url}/test/clear-testing-database`);
    cy.request('POST', `${api_url}/test/generate-testing-entities`);
  });

  describe('Basics', () => {
    it('Should render main page', () => {
      cy.contains('Notes application');
      cy.contains(`With just a title and the content you're ready to go!`);
    });

    it('Should render login form when Login button is clicked', () => {
      cy.contains('Login').click();
      cy.get('[placeholder="Email"]');
      cy.get('[placeholder="Password"]');
    });
  });

  describe('Login', () => {
    it('Should login with valid email and password and logout', () => {
      cy.contains('Login').click();
      cy.get('[placeholder="Email"]').type(user.email);
      cy.get('[placeholder="Password"]').type(user.password);
      cy.get('.loginButton').click();
      cy.contains('Logout').click();
    });

    it('Should fails login with wrong password', () => {
      cy.contains('Login').click();
      cy.get('[placeholder="Email"]').type(user.email);
      cy.get('[placeholder="Password"]').type('wrong password');
      cy.get('.loginButton').click();
      cy.contains('Error').click();
    });
  });

  describe('Note creation', () => {
    beforeEach(() => {
      cy.login(user);
    });

    afterEach(() => {
      cy.contains('Logout').click();
    });

    it('should create note with valid title, content and important == false', () => {
      const title = 'test title';
      cy.get('[placeholder="Title"]').type(title);
      cy.get('[placeholder="Content"]').type('test content');
      cy.get('[name="important"]').first().check();
      cy.contains('Add new note').click();
      cy.contains(title);
    });
  });
});
