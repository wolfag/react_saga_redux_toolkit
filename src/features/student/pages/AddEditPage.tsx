import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { studentApi } from 'api';
import { IStudent } from 'models';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { StudentForm } from '../components/StudentForm';
import { toast } from 'react-toastify';

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
  const history = useHistory();

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

  const initialValues: IStudent = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as IStudent;

  const handleStudentFormSubmit = async (data: IStudent) => {
    if (isEdit) {
      await studentApi.update(data);
    } else {
      await studentApi.add(data);
    }

    toast.success('🦄 Save successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    history.push('/admin/students');
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student' : 'Add new student'}</Typography>

      {(!isEdit || !!student) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
