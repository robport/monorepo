import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AuthErrorFeedback from '../auth/auth-error-feedback';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { httpPost } from '../../common/http';

const MakeABidDialog = (props: {
  minBid: number,
  auctionId: number
  onBid: () => void
  onClose: () => void
  show: boolean
}) => {
  const [error, setError] = useState<any>('');

  const handleMakeABid = async (bid: number) => {
    try {
      const result = await httpPost('auction/bid', {
        auctionId: props.auctionId,
        bid: bid
      });
      if (result.success) {
        props.onBid();
        handleClose();
      } else {
        setError(result.reason);
      }
    } catch (err) {
      setError(err.message);
    }

  };
  const handleClose = () => {
    setError('');
    formik.resetForm()
    props.onClose();
  };

  const clearError = () => {
    setError('');
  };

  const yup = Yup.object({
    bid: Yup.number()
      .min(props.minBid, `Minimum bid is currently ${props.minBid}`)
      .required('Enter a bid')
  });

  const formik = useFormik({
    initialValues: { bid: '' },
    validationSchema: yup,
    onSubmit: async (values, { setSubmitting }) => {
      await handleMakeABid(Number.parseInt(values.bid));
      setSubmitting(false);
    }
  });

  return (
    <Modal id="bid-dialog"
           show={props.show}
           onHide={handleClose}
           centered>

      <Modal.Header closeButton>
        <Modal.Title>
          Make a Bid
        </Modal.Title>
      </Modal.Header>


      <Form noValidate
            onChange={clearError}
            onSubmit={formik.handleSubmit}>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Bid:</Form.Label>
            <Form.Control
              name="bid"
              placeholder="Enter your bid..."
              {...formik.getFieldProps('bid')}
              isInvalid={!!formik.errors.bid && formik.touched.bid}/>
            <Form.Control.Feedback type="invalid">
              {formik.errors.bid}
            </Form.Control.Feedback>
            <AuthErrorFeedback id="server-feedback">
              {error}
            </AuthErrorFeedback>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>

          <Button type="button"
                  id="close-bid-dialog"
                  variant="outline-secondary"
                  onClick={handleClose}>Close</Button>

          <Button type="submit"
                  disabled={formik.isSubmitting}
                  id="bid-now">Bid Now</Button>

        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MakeABidDialog;
