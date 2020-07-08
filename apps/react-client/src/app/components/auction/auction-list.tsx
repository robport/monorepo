import React, { useEffect, useState } from 'react';
import { ActionResponse, Auction } from '@monorepo/data';
import { httpDeleteOne, httpGet } from '../../common/http';
import useErrorContext from '../../common/use-error-context';
import { Wrapper } from '../../common/atom';
import AuctionTable from './auction-table';
import AuctionForm from './auction-form';
import { useHistory } from 'react-router-dom';

const AuctionList = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const { addError, removeError } = useErrorContext();
  const history = useHistory();

  const getAll = () => {
    httpGet('auction')
      .catch(e => addError(e.message))
      .then(setAuctions);
  };

  const handleDelete = (id: number) => {
    removeError();
    httpDeleteOne('auction', id)
      .catch(e => addError(e.message))
      .then((response: ActionResponse) => {
        if (response.success) {
          getAll();
        } else {
          addError(response.reason);
        }
      });
  };

  const handleViewBids = (id: number) => {
    history.push(`auctions/${id}`);
  };

  useEffect(getAll, []);

  return (
    <Wrapper>
      <AuctionTable auctions={auctions}
                    onViewBids={handleViewBids}
                    onDelete={handleDelete}/>
      <AuctionForm onAdded={getAll}/>
    </Wrapper>
  );
};

export default AuctionList;
