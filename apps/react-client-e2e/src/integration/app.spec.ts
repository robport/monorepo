import {
  enterTodo,
  getDeleteButton,
  getErrorMessage,
  getResetButton,
  getSubmitButton,
  getTodos
} from '../support/app.po';
import { login, logout } from '../support/auth.po';

describe('TodoApps', () => {

  describe('logged in', () => {

    beforeEach(() => {
      cy.visit('/');
      login();
      getResetButton().click();
    });

    afterEach(() => {
      logout();
    });

    it('should display todos', () => {
      getTodos().should((t) => expect(t.length).equal(2));
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

  describe('logged out', () => {

    beforeEach(() => {
      cy.visit('/');
      login();
      getResetButton().click();
      logout();
    });

    it('should not add and show error bar', () => {
      enterTodo('New Todo');
      getSubmitButton().click();
      getTodos().should((t) => expect(t.length).equal(2));
      getErrorMessage().should($m => {
        expect($m.first()).to.contain('Unauthorized');
      });
    });

    it('should not delete and show error bar', () => {
      const deleteBtn = getDeleteButton();
      deleteBtn.click();
      getTodos().should((t) => expect(t.length).equal(2));
      getErrorMessage().should($m => {
        expect($m.first()).to.contain('Unauthorized');
      });
    });

  });
});
