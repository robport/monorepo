export const login = () => {
  cy.get('a#openLogin').click();
  cy.get('#login-button').click();
}
