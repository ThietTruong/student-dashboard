import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import * as React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}
const useStyle = makeStyles(() => ({
  root: {
    padding: '16px',
    border: '1px solid  #eeeeee',
  },
}));
export default function Widget(props: WidgetProps) {
  const { title, children } = props;
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <Typography variant="button"> {title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
