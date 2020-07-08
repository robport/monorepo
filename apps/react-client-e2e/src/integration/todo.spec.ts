import {
  enterTodo,
  getDeleteButton,
  getResetButton,
  getSubmitButton,
  getTodos
} from '../support/todo.po';
import { login, logout } from '../support/auth.po';
import { getErrorMessage } from '../support/general.po';

describe('Todo', () => {

  describe('logged in', () => {

    beforeEach(() => {
      cy.visit('/todos');
      login('rob@rob.com', 'password');
      getResetButton().click();
    });

    afterEach(() => {
      logout();
    });

    it('should display todos', () => {
      getTodos().should(t => expect(t.length).equal(2));
      enterTodo('New Todo');
      getSubmitButton().click();
      getTodos().should(t => expect(t.length).equal(3));
    });

    it('should delete item', () => {
      const deleteBtn = getDeleteButton();
      deleteBtn.click();
      getTodos().should((t) => expect(t.length).equal(1));
    });
  });

  describe('logged out', () => {

    beforeEach(() => {
      cy.visit('/todos');
      login('rob@rob.com', 'password');
      getResetButton().click();
      logout();
    });

    it('should not add and show error bar', () => {
      enterTodo('New Todo');
      getSubmitButton().should('be.disabled');
      getTodos().should((t) => expect(t.length).equal(2));
    });

    it('should not delete and show error bar', () => {
      const deleteBtn = getDeleteButton();
      deleteBtn.click();
      getTodos().should((t) => expect(t.length).equal(2));
      getErrorMessage().should($m => {
        expect($m.first()).to.contain('login-required');
      });
    });

  });
});
