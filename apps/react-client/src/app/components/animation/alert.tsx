import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { CSSTransition } from 'react-transition-group';

import './alert.css';
import Container from 'react-bootstrap/Container';

const AlertAnimation = () => {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  return (
    <Container style={{ paddingTop: '2rem' }}>
      {showButton && (
        <Button
          onClick={() => setShowMessage(true)}>
          Show Message
        </Button>
      )}
      <CSSTransition
        in={showMessage}
        timeout={1300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}>
        <Alert
          variant="primary"
          dismissible
          onClose={() => setShowMessage(false)}>
          <Alert.Heading>
            Animated alert message
          </Alert.Heading>
          <p>
            This alert message is being transitioned in and
            out of the DOM.
          </p>
          <Button onClick={() => setShowMessage(false)}>
            Close
          </Button>
        </Alert>
      </CSSTransition>
    </Container>
  );
}

export default AlertAnimation;
