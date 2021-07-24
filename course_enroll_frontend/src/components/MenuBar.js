import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LoginDialog from './dialogs/LoginDialog';
import { JWT_TOKEN_COOKIE_NAME } from '../constants';
import cookie from 'react-cookies';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuBar() {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  // 检查token还在不在，是否需要login
  const isLogout = cookie.load(JWT_TOKEN_COOKIE_NAME) ? true : false;
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Course Enroll System
          </Typography>
          <Button color="inherit" component={Link} to="/"> All Courses</Button>
          <Button color="inherit" component={Link} to="/enrolled_courses">Enrolled Courses</Button>
          <Button color="inherit" onClick={handleLoginButtonClick}>{isLogout ? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={openDialog} onClose={handleDialogClose}/>
    </div>
  );

  function handleLoginButtonClick() {
    if (isLogout) {
      cookie.remove(JWT_TOKEN_COOKIE_NAME);
      window.location.reload();
    } else {
      // open dialog
      setOpenDialog(true);
    }
  }

  function handleDialogClose() {
    setOpenDialog(false)
  }
}
