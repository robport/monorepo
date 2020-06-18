import { enterTodo, getDeleteButton, getResetButton, getSubmitButton, getTodos } from '../support/app.po';

describe('TodoApps', () => {
  beforeEach(() => {
    cy.visit('/');
    getResetButton().click();
  });

  it('should display todos', () => {
    getTodos().should((t) => expect(t.length).equal(2));
    console.log(getTodos())
    enterTodo('New Todo');
    getSubmitButton().click();
    getTodos().should((t) => expect(t.length).equal(3));
  });

  it('should delete item', () => {
    const deleteBtn = getDeleteButton();
    deleteBtn.click();
    getTodos().should((t) => expect(t.length).equal(1));
  });
});
