import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export enum AlertFeedbackType {
  success = 'success',
  error = 'error'
}

interface AlertFeedbackProps {
  close: () => void;
  open: boolean;
  message: string;
  feedback: AlertFeedbackType;
}

const AlertFeedback: React.FC<AlertFeedbackProps> = ({ open, close, message, feedback }) => {
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={close} open={open}>
        <Alert variant="filled" severity={feedback}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertFeedback;
