import React, { useEffect, useState } from 'react';
import { httpGet } from '../../common/http';
import { Auction } from '@monorepo/data';
import FourOFour from '../four-o-four/four-o-four';
import { Wrapper } from '../../common/atom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MakeABidDialog from './make-a-bid-dialog';
import { format, formatDistanceToNow, formatRelative } from 'date-fns';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  margin: auto;
  text-align: center;
  width: 100%
`;

const NoBidLabel = styled.h3`
  margin: 0;
  text-align: center;
  color: lightgray;
  padding-bottom: 50px;
`;

const AuctionBids = (props) => {
  const id: number = Number.parseInt(props.match.params.id);
  const [auction, setAuction] = useState<Auction>();
  const [show404, setShow404] = useState(false);
  const [showBidder, setShowBidder] = useState(false);

  const bids = auction && auction.bidHistory ? auction.bidHistory : [];
  const minBid = auction && auction.winningBid ? auction.winningBid.bid : 0;
  const expires = auction && formatRelative(new Date(auction.expiryDate), new Date());
  const timeLeft = auction && formatDistanceToNow(new Date(auction.expiryDate));
  const isLive = auction && !auction.isExpired;
  const showNoBidsLabel = auction && (!auction.bidHistory || (auction.bidHistory && auction.bidHistory.length === 0));

  let interval: any;

  const loadAuction = (id: number) => {
    httpGet(`auction/${id}`)
      .catch(() => setShow404(true))
      .then((auction: Auction) => {
        setAuction(auction);
        if ( interval && auction.isExpired ) {
          clearInterval(interval);
        }
      });
  };

  useEffect(() => {
    loadAuction(id);
    interval = setInterval(async () => {
      await loadAuction(id);
    }, 5000);
    return () => {
      if ( interval ) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <Wrapper>
      {show404
      && <FourOFour location={props.location}/> ||
      <div>
        <h2 id="auction-detail-item-name">{auction?.itemName}</h2>
        <p>{isLive ? 'Expires:' : 'Expired:'} {expires}</p>
        {isLive &&
        <p>Time Left: {timeLeft}</p>
        }

        <Table id="auction-detail-bid-table">
          <thead>
          <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Amount (p)</th>
            <th>Bidder</th>
          </tr>
          </thead>
          <tbody>
          {
            bids.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.time ? format(new Date(b.time), 'yyyy-MM-dd HH:mm') : ''}</td>
                <td>{b.bid}</td>
                <td>{b.bidder.email}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
        {showNoBidsLabel &&
        <NoBidLabel>No bids</NoBidLabel>
        }
        {isLive &&
        <ButtonContainer>
          <Button
            id="open-bid-dialog"
            size="lg"
            onClick={() => setShowBidder(true)}>Bid Now</Button>
        </ButtonContainer>
        }

        <MakeABidDialog minBid={minBid}
                        auctionId={id}
                        onBid={async () => await loadAuction(auction.id)}
                        onClose={() => setShowBidder(false)}
                        show={showBidder}/>
      </div>
      }
    </Wrapper>
  );
};

export default AuctionBids;
