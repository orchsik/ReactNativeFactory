import React, { useState } from 'react';

import createCtx from '../createCtx';
import Alert, { Props as AlertProps } from './Alert';

interface Context {
  alert: Function;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
}

function AlertProvider({ children }: Props): React.ReactElement {
  const initialState: AlertProps = {
    type: '',
    isOpen: false,
    message: '',
    okText: '',
  };

  const [alertState, setAlertState] = useState(initialState);

  const alert = (message: string, okText = 'OK') => {
    setAlertState({
      isOpen: true,
      message,
      okText,
    });
  };

  const close = () => {
    setAlertState(initialState);
  };

  return (
    <Provider value={{ alert }}>
      <>
        {children}
        <Alert {...alertState} />
      </>
    </Provider>
  );
}

export { useCtx as useAlert, AlertProvider };
