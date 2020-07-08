import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { httpLogin } from '../../common/http';
import useErrorContext from '../../common/use-error-context';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthError } from '@monorepo/data';
import AuthErrorFeedback from './auth-error-feedback';

export interface LoginProps {
  show: boolean,
  onClose: () => void,
}

const LoginDialog = (props: LoginProps) => {
  const { removeError } = useErrorContext();
  const [loginError, setLoginError] = useState<any>({});

  const yup = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const login = async (email: string, password: string) => {
    removeError();
    try {
      await httpLogin(email, password);
      props.onClose();
      setLoginError({  });
    } catch (e) {
      if (e.message === AuthError.INVALID_USER) {
        setLoginError({email: `User ${email} is not registered` });
      } else if (e.message === AuthError.INVALID_PASSWORD) {
        setLoginError({ password: `Incorrect password`});
      } else {
        setLoginError(e.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: { email: 'rob@rob.com', password: 'password' },
    validationSchema: yup,
    onSubmit: async (values, { setSubmitting }) => {
      await login(values.email, values.password);
      setSubmitting(false);
    }
  });


  const handleClose = () => {
    setLoginError('');
    props.onClose();
  };

  const handleChange = () => {
    setLoginError({})
  }

  return (
    <Modal show={props.show}
           onHide={handleClose}
           centered>

      <Modal.Header closeButton>
        <Modal.Title>
          Login
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
              id="login-email"
              name="email"
              placeholder="Enter email..."
              {...formik.getFieldProps('email')}
              isInvalid={!!formik.errors.email && formik.touched.email}/>
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
            <AuthErrorFeedback>{loginError.email}</AuthErrorFeedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="login-password"
              name="password"
              placeholder="Enter password..."
              {...formik.getFieldProps('password')}
              isInvalid={!!formik.errors.password && formik.touched.password}/>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
            <AuthErrorFeedback>{loginError.password}</AuthErrorFeedback>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>

          <Button type="button"
                  variant="outline-secondary"
                  onClick={handleClose}>Close</Button>

          <Button type="submit"
                  id="login-button"
                  disabled={!formik.isValid}>Login</Button>

        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginDialog;
