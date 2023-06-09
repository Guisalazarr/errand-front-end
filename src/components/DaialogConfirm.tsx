import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface DialogConfirmProps {
  title: string;
  subtile: string;
  description: string;
  openDialog: boolean;
  actionCancel: () => void;
  actionConfirm: () => void;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  title,
  openDialog,
  subtile,
  description,
  actionCancel,
  actionConfirm
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={actionCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box bgcolor="#c4cbb7" sx={{ textAlign: 'center' }}>
        <DialogTitle color="black" id="alert-dialog-title">
          {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText variant="h4" color="black" id="alert-dialog-description">
            {subtile}
          </DialogContentText>
          <DialogContentText variant="body1" color="black" id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={actionCancel} color="secondary" fullWidth>
            Cancelar
          </Button>

          <Button variant="contained" onClick={actionConfirm} fullWidth>
            Confirmar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DialogConfirm;
