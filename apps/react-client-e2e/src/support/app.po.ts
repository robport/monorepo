export const getTodos = () => cy.get('tr.todo');
export const routeToAnimationPage = () => {
  cy.visit('/animation');
};
export const enterTodo = (title: string) => {
  cy.get('input#title').type(title);
};
export const getSubmitButton = () => cy.get('button#add-todo');
export const getResetButton = () => cy.get('button#reset-todos');
export const getDeleteButton = () => cy.get(`svg`).first();
export const getErrorMessage = () => cy.get('p#error-message')
