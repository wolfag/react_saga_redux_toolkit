import { Paper, makeStyles, Typography, Box, Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import React, { ReactElement } from 'react';
import { authActions } from '../authSlice';

interface Props {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
}));

export default function LoginPage({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: 'admin',
        password: 'root',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            Fake Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(authActions.logout());
            }}
          >
            Fake Logout
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
