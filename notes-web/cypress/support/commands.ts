/// <reference types="cypress" />

import { CredentialsDTO } from './interfaces';

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login;
    }
  }
}

function login(user: CredentialsDTO) {
  const api_url = Cypress.env('api_url');
  cy.request('POST', `${api_url}/auth/login`, user).then(({ body: { token } }) => {
    localStorage.setItem('authToken', token);
    cy.visit('/');
  });
}
/**
 * Login command
 */
Cypress.Commands.add('login', login);
