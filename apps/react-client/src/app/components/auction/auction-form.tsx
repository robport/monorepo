import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Auction, CreateAuctionRequest } from '@monorepo/data';
import { httpPost, isLoggedIn } from '../../common/http';
import useErrorContext from '../../common/use-error-context';
import styled from 'styled-components';

interface AuctionAddProps {
  onAdded: (todo?: Auction) => void;
}

const AuctionButton = styled(Button)`
  margin-right: 10px;
`;

const defaults: CreateAuctionRequest = {
  auctionName: '',
  expiryInSeconds: 2000,
  reservePrice: 1000
};

const AuctionForm = (props: AuctionAddProps) => {
  const [formData, setFormData] = useState<CreateAuctionRequest>(defaults);
  const { addError, removeError } = useErrorContext();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      auctionName: event.target.value
    });
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!formData.auctionName) {
      return;
    }
    try {
      removeError();
      const newAuction = await httpPost('auction', formData);
      props.onAdded(newAuction);
      setFormData(defaults);
    } catch (e) {
      addError(e.message);
      console.error(e);
    }
  };

  const isAddDisabled = () => {
    return !isLoggedIn() || !formData.auctionName;
  };

  return (
    <Form onSubmit={handleAdd}>
      <h6>List a new item...</h6>
      <Form.Group>
        <Form.Control type="text"
                      value={formData.auctionName}
                      onChange={handleChange}
                      placeholder="Item description"/>
      </Form.Group>

      <AuctionButton variant="primary"
                     id="add-auction"
                     disabled={isAddDisabled()}
                     type="submit">
        Add
      </AuctionButton>
    </Form>
  );
};

export default AuctionForm;
