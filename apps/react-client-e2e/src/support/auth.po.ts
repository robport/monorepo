export const login = () => {
  cy.get('a#openLogin').click();
  cy.get('#login-button').click();
};
export const logout = () => cy.get('#logout-link').click();
