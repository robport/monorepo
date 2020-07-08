export const getTodos = () => cy.get('tr.todo');
export const enterTodo = (title: string) => {
  cy.get('input#title').type(title);
};
export const getSubmitButton = () => cy.get('button#add-todo');
export const getResetButton = () => cy.get('button#reset-todos');
export const getDeleteButton = () => cy.get(`svg`).first();
