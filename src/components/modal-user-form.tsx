import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import log from '../lib/logger';

type ModalUserFormProps = {
  open: boolean;
  user: string;
  onUpdate: (user: string) => void;
};

export const ModalUserForm = ({ open, user, onUpdate }: ModalUserFormProps) => {
  const [newUser, setNewUser] = useState(user);
  const handleClose =
    (update: boolean = false) =>
    () => {
      log('handleClose', update);
      onUpdate(update ? newUser : user);
    };

  const handleChange = (text: string) => {
    setNewUser(text);
  };
  return (
    <Dialog open={open} onClose={handleClose()} fullWidth>
      <DialogTitle>Change Github User</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a new user or org name:</DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          id="user"
          fullWidth
          value={newUser}
          onChange={(e) => handleChange(e.currentTarget.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && newUser?.length) setTimeout(handleClose(true), 500);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose()}>Cancel</Button>
        <Button onClick={handleClose(true)} variant="contained" disabled={!newUser?.length}>
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
