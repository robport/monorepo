import {
  closeBidDialog,
  enterBid,
  enterNewItem,
  getAuctions,
  getBidDialog,
  getBidNowButton,
  getBidNowServerFeedback,
  getBidTable,
  getDetailPageTitle,
  getOpenBidDialogButton,
  submitNewListingForm
} from '../support/auction.po';
import { login, logout } from '../support/auth.po';

describe('Auction', () => {

  describe('logged in', () => {

    const itemName = 'Holiday Cottage ' + new Date().getMilliseconds();

    beforeEach(() => {
      cy.visit('/auctions');
      login('rob@rob.com', 'password');
    });

    afterEach(() => {
      logout();
    });

    it('should create an auction ', () => {
      enterNewItem(itemName);
      submitNewListingForm();
      getAuctions().eq(0).contains('td', 'Holiday Cottage');
    });

    it('should got to auction detail page ', () => {
      getAuctions().eq(0).click();
      getDetailPageTitle().contains(itemName);
    });

    it('should not bid as seller ', () => {
      getAuctions().eq(0).click();
      getOpenBidDialogButton().click();
      getBidDialog().should('be.visible');
      enterBid('1000');
      getBidNowButton().click();
      getBidNowServerFeedback().contains('Seller cannot bid on own auction');
      closeBidDialog();
    });

  });

  describe('enter bid', () => {
    beforeEach(() => {
      cy.visit('/auctions');
      login('fred@fred.com', 'password');
      getAuctions().eq(0).click();
    });

    it('should make a bid', () => {
      getOpenBidDialogButton().click();
      getBidDialog().should('be.visible');
      enterBid('1000');
      getBidNowButton().click();
      getBidTable().should(bid => {
      });
    });
  });

})
;
