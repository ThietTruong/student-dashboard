import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice';
import { useAppSelector } from '../../../app/hooks';

export interface LoginPageProps {}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
  },
  box: {
    position: 'absolute',
    padding: '16px',
    bottom: '50%',
    left: '50%',
    transform: 'translate(-50%, 50%)',
  },
}));
export default function LoginPage(props: LoginPageProps) {
  const dispath = useDispatch();
  const classes = useStyles();
  const isLogging = useAppSelector((state) => state.auth.logging);
  const handleLoginClick = () => {
    dispath(authActions.login({ username: '', password: '' }));
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student management
        </Typography>
        <Box mt={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            {isLogging && <CircularProgress size={20} color="primary" />} &nbsp;
            Fake login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
