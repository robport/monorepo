import { enterTodo, getSubmitButton, getTodos, routeToAddPage } from '../support/app.po';

describe('TodoApps', () => {
  beforeEach(() => cy.visit('/'));

  it('should display todos', () => {
    getTodos().should((t) => expect(t.length).equal(2));
    routeToAddPage();
    enterTodo('New Todo')
    getSubmitButton().click();
    getTodos().should((t) => expect(t.length).equal(3));
  });
});
