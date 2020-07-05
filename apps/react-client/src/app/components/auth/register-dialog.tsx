import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { httpRegister } from '../../common/http';
import useErrorContext from '../../common/use-error-context';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthError } from '@monorepo/data';
import AuthErrorFeedback from './auth-error-feedback';

export interface RegisterProps {
  show: boolean,
  onClose: () => void,
}

const RegisterDialog = (props: RegisterProps) => {
  const { removeError } = useErrorContext();
  const [registerError, setRegisterError] = useState<any>({});

  const yup = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const register = async (email: string, password: string) => {
    removeError();
    try {
      await httpRegister(email, password);
      props.onClose();
      setRegisterError({});
    } catch (e) {
      if (e.message === AuthError.EMAIL_ALREADY_REGISTERED) {
        setRegisterError({ email: `Email is already registered` });
      } else {
        setRegisterError({ email: e.message });
      }
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup,
    onSubmit: async (values, { setSubmitting }) => {
      await register(values.email, values.password);
      setSubmitting(false);
    }
  });


  const handleClose = () => {
    setRegisterError('');
    props.onClose();
  };

  const handleChange = () => {
    setRegisterError({});
  };

  return (
    <Modal show={props.show}
           onHide={handleClose}
           centered>

      <Modal.Header closeButton>
        <Modal.Title>
          Register
        </Modal.Title>
      </Modal.Header>

      <Form noValidate
            onChange={handleChange}
            onSubmit={formik.handleSubmit}>

        <Modal.Body>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email..."
              {...formik.getFieldProps('email')}
              isInvalid={!!formik.errors.email && formik.touched.email}/>
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
            <AuthErrorFeedback>{registerError.email}</AuthErrorFeedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password..."
              {...formik.getFieldProps('password')}
              isInvalid={!!formik.errors.password && formik.touched.password}/>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
            <AuthErrorFeedback>{registerError.password}</AuthErrorFeedback>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>

          <Button type="button"
                  variant="outline-secondary"
                  onClick={handleClose}>Close</Button>

          <Button type="submit"
                  id="register-button"
                  disabled={!formik.isValid}>Register</Button>

        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RegisterDialog;
