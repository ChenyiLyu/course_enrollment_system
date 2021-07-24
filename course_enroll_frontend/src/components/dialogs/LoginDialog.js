import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import JwtService from '../../services/JwtService';
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE_NAME } from '../../constants';
import { DialogContentText } from '@material-ui/core';

export default function LoginDialog(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState();
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="username"
            fullWidth
            onChange={event => setUsername(event.target.value)}
            disabled={isLoading}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={event => setPassword(event.target.value)}
            disabled={isLoading}
          />
          <DialogContentText color="error">
              {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={login} color="primary" disabled={isLoading}>
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  function login() {
      // send request to server (username + password)
      // 1. if succeeded, store JWT token in cookie
      // 2. if failed, show an error message
      setIsLoading(true);
      JwtService.login(username, password)
        .then(response => {
            cookie.save(JWT_TOKEN_COOKIE_NAME, response.data.access);
            window.location.reload();
        })
        .catch(error => {
            console.log(error.response.data.detail);
            setErrorMessage(error.response.data.detail);
        })
        .finally(() => setIsLoading(false));
  }
}
