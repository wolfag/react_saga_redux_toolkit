import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface Props {
  icon: ReactElement;
  label: string;
  value: string | number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default function StatisticItem({ icon, label, value }: Props): ReactElement {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
