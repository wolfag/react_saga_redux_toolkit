import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { studentApi } from 'api';
import { IStudent } from 'models';
import React, { ReactElement, useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function AddEditPage(): ReactElement {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = !!studentId;
  const [student, setStudent] = useState<IStudent>();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      setLoading(true);
      try {
        const response: IStudent = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log({ AddEditPage: { ...error } });
      }
      setLoading(false);
    })();
  }, [studentId]);

  console.log({ loading });

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student' : 'Add new student'}</Typography>
    </Box>
  );
}
