import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { httpLogin, httpLogout } from '../../common/http';

export interface LoginProps {
  show: boolean,
  onClose: () => void,
}

const Login = (props: LoginProps) => {

  const login = async () => {
    await httpLogin('john', 'changeme');
    props.onClose();
  };

  return (
    <Modal show={props.show}
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Replace with Form Data
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => props.onClose()}>Close</Button>
        <Button id="login-button" onClick={login}>Login</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
