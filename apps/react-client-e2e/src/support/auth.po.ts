export const login = (email: string, password: string) => {
  cy.get('#login-nav').click();
  cy.get('#login-email').clear();
  cy.get('#login-email').type(email);
  cy.get('#login-password').clear();
  cy.get('#login-password').type(password);
  cy.get('#login-button').click();
};
export const logout = () => cy.get('#logout-nav').click();
