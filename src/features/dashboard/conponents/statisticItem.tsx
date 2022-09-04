import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';

export interface StatisticItemProps {
  icon: ReactElement;
  lable: string;
  value: string | number;
}

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
  },
}));

export default function StatisticItem(props: StatisticItemProps) {
  const { icon, lable, value } = props;
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="subtitle1">{lable}</Typography>
      </Box>
    </Paper>
  );
}
