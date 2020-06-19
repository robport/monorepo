import { useContext } from 'react';
import { ErrorContext } from './error-provider';

function useErrorContext() {
  const { error, addError, removeError } = useContext(ErrorContext);
  return { error, addError, removeError };
}

export default useErrorContext;
