export const enterNewItem = (itemName: string) => {
  cy.get('input#new-item-name').type(itemName);
};
export const submitNewListingForm = () => {
  cy.get('button#submit-new-listing').click();
}
export const getAuctions = () => {
  return cy.get('tr.auction')
}
export const getDetailPageTitle = () => {
  return cy.get('#auction-detail-item-name')
}
export const getOpenBidDialogButton = () => {
  return cy.get('button#open-bid-dialog')
}
export const getBidNowButton = () => {
  return cy.get('button#bid-now')
}
export const getBidDialog = () => {
  return cy.get('#bid-dialog');
}
export const enterBid = (bid: string) => {
  cy.get('input').type(bid);
}
export const getBidNowServerFeedback = () => {
  return cy.get('#server-feedback');
}
export const closeBidDialog = () => {
  cy.get('#close-bid-dialog').click();
}
export const getBidTable = () => {
  return cy.get('#auction-detail-bid-table')
}
