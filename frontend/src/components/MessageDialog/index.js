import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MessageDialog({ open,setOpen, setConfirm }) {

  const [message, setMessage] =  React.useState("");
  const handleClose = () => {
      setOpen(false);
  }
  const messageHandler = (e) => {
    setMessage(e.target.value);
  }
  const handleConfirm = (e) => {
      setConfirm(message);
      setOpen(false);
  }

  return (

    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send a message!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            if you dont have anything to send, tell me about your first web3 project!.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="msg"
            label=""
            type="text"
            fullWidth
            variant="standard"
            onChange={messageHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nah, I'll pass</Button>
          <Button onClick={handleConfirm}>Wave</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
