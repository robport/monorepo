export const getTodos = () => cy.get('tr.todo');
export const routeToAddPage = () => {
  cy.visit('/add');
};
export const enterTodo = (title: string) => {
  cy.get('input#title').type(title);
}
export const getSubmitButton = () => cy.get('button#add-todo');
