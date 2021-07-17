import { makeStyles, Toolbar } from '@material-ui/core';
import { AppBar, Button, Typography } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export function Header(): ReactElement {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Management
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
