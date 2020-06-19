import React, { useCallback, useState } from 'react';

interface AppError {
  error: string;
  addError: (message: string) => void;
  removeError: () => void;
}

export const ErrorContext = React.createContext<AppError>({
  error: null,
  addError: () => {},
  removeError: () => {}
});

export default function ErrorProvider({ children }) {
  const [error, setError] = useState(null);
  const removeError = () => setError(null);
  const addError = (message: string) => setError(message);

  const contextValue: AppError = {
    error,
    addError: useCallback((message: string) => addError(message), []),
    removeError: useCallback(() => removeError(), [])
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}
