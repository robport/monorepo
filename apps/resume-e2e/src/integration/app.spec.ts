import { enterTodo, getResetButton, getSubmitButton, getTodos } from '../support/app.po';

describe('TodoApps', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display todos', () => {
    getResetButton().click()
    getTodos().should((t) => expect(t.length).equal(2));
    enterTodo('New Todo');
    getSubmitButton().click();
    getTodos().should((t) => expect(t.length).equal(3));
  });
});
