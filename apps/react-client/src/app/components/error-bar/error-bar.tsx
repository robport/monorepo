import React from 'react';
import Alert from 'react-bootstrap/Alert';
import useErrorContext from '../../common/use-error-context';

const ErrorBar = () => {
  const { error, removeError } = useErrorContext();

  return (
    <>
      {error &&
      <Alert variant="danger"
             onClose={() => removeError()}
             dismissible>
        <Alert.Heading>Uh oh, you got an error!</Alert.Heading>
        <p id="error-message">
          {error}
        </p>
      </Alert>
      }
    </>
  );
};

export default ErrorBar;
