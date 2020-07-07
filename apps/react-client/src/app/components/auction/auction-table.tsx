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

export const AuctionTable = (props: {
  auctions: Auction[],
  onDelete: (id: number) => void
  onViewBids: (id: number) => void,
  onMakeABid: (id: number) => void
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
        <tr className={t.isExpired?'expired':''} key={t.id}>
          <td>{t.id}</td>
          <td>{t.itemName}</td>
          <td>{t.seller ? t.seller.email : ''}</td>
          <td>{t.expiryDate ? format(new Date(t.expiryDate), 'yyyy-MM-dd HH:mm:ss') : ''}</td>
          <td>{t.reservePrice}</td>
          <td>{t.winningBid ? t.winningBid.bid : ''}</td>
          <td>{t.winningBid ? t.winningBid.bidder.email : ''}</td>
          <td>
            <Dropdown>
              <Dropdown.Toggle as={StyledButton} size="sm" id="dropdown-basic">
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => props.onMakeABid(t.id)}>Make a bid</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onViewBids(t.id)}>View bids</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onMakeABid(t.id)}>Delete</Dropdown.Item>
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
