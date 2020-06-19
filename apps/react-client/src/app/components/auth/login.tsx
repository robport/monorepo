import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { httpLogin, httpLogout } from '../../common/http';
import useErrorContext from '../../common/use-error-context';

export interface LoginProps {
  show: boolean,
  onClose: () => void,
}

const Login = (props: LoginProps) => {
  const { removeError } = useErrorContext();
  const [ loginError, setLoginError ] = useState('')

  const login = async () => {
    removeError();
    try {
      await httpLogin('john', 'changeme');
      props.onClose();
      setLoginError('')
    } catch ( e ) {
      setLoginError(e.message)
    }
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
          Login as John
        </p>
        { loginError && <p>{loginError}</p> }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => props.onClose()}>Close</Button>
        <Button id="login-button" onClick={login}>Login</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
