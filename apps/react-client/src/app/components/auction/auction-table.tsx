import React from 'react';
import { Auction } from '@monorepo/data';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import './auction.css';


const StyledButton = styled.div`
  cursor: pointer;
  width: 100%
`;

const ClickableTD = styled.td`
  cursor: pointer;
`;


export const AuctionTable = (props: {
  auctions: Auction[],
  onDelete: (id: number) => void
  onViewBids: (id: number) => void,
}) => {

  return (
    <Table bordered hover>
      <thead>
      <tr>
        <th>Id</th>
        <th>Item</th>
        <th>Seller</th>
        <th>Expiry</th>
        <th>Reserve</th>
        <th>Winning Bid</th>
        <th>Winning Bidder</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {props.auctions.map((t) => (
        <tr className={t.isExpired ? 'expired' : ''} key={t.id}>
          <ClickableTD onClick={()=> props.onViewBids(t.id)}>{t.id}</ClickableTD>
          <ClickableTD onClick={()=> props.onViewBids(t.id)}>{t.itemName}</ClickableTD>
          <ClickableTD onClick={()=> props.onViewBids(t.id)}>{t.seller ? t.seller.email : ''}</ClickableTD>
          <ClickableTD onClick={()=> props.onViewBids(t.id)}>{t.expiryDate ? format(new Date(t.expiryDate), 'yyyy-MM-dd HH:mm:ss') : ''}</ClickableTD>
          <ClickableTD onClick={()=> props.onViewBids(t.id)}>{t.reservePrice}</ClickableTD>
          <ClickableTD onClick={()=> props.onViewBids(t.id)}>{t.winningBid ? t.winningBid.bid : ''}</ClickableTD>
          <ClickableTD onClick={()=> props.onViewBids(t.id)}>{t.winningBid ? t.winningBid.bidder.email : ''}</ClickableTD>
          <td>
            <Dropdown>
              <Dropdown.Toggle as={StyledButton} size="sm" id="dropdown-basic">
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => props.onViewBids(t.id)}>View bids</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onDelete(t.id)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default AuctionTable;
