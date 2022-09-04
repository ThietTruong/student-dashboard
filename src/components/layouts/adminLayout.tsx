import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Header, Sidebar } from '../common';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../../features/dashboard/dashboard';
import { Student } from '../../features/student/student';
const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '280px 1fr',
    gridTemplateAreas: '"header header" "sidebar main"',
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    borderBottom: '1px dotted #000',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: '1px dotted #000',
  },
  main: {
    gridArea: 'main',
    padding: '4px 8px',
  },
}));

export interface AdminLayoutProps {}

export function AdminLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Outlet />
      </Box>
    </Box>
  );
}
