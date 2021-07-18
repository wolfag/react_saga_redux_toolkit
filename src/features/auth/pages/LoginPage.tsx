import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { ReactElement } from 'react';
import { authActions, selectIsLogging } from '../authSlice';

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

export default function LoginPage(): ReactElement {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isLogging = useAppSelector(selectIsLogging);

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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
            startIcon={isLogging && <CircularProgress size={20} color="secondary" />}
          >
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
