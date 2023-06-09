import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface AlertFeedbackProps {
  close: () => void;
  open: boolean;
  message: string;
}

const AlertFeedback: React.FC<AlertFeedbackProps> = ({ open, close, message }) => {
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={close} open={open}>
        <Alert variant="filled">{message}</Alert>
      </Snackbar>
    </>
  );
};

export default AlertFeedback;
