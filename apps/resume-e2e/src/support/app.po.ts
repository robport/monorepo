export const getTodos = () => cy.get('li.todo');
export const routeToAddPage = () => {
  cy.visit('/add');
};
export const enterTodo = (title: string) => {
  cy.get('input#title').type(title);
}
export const getSubmitButton = () => cy.get('input#add-todo');
