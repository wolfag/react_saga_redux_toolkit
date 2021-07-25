import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { PlusOne } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';
import { studentApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { IListParams, IStudent, TOrder } from 'models';
import React, { ReactElement, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  pagination: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage(): ReactElement {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const match = useRouteMatch();
  const history = useHistory();

  const studentList = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const count = Math.ceil(pagination?._totalRows / pagination?._limit);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleOrderChange = (order: TOrder, property: keyof IStudent) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _sort: property,
        _order: order,
      })
    );
  };

  const handleSearchChange = (newFilter: IListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: IListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: IStudent) => {
    try {
      await studentApi.remove(student.id || '');
      dispatch(studentActions.setFilter({ ...filter }));
      toast.success('🦄 Delete successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleEditStudent = (student: IStudent) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" startIcon={<PlusOne />}>
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFilters
          {...{
            filter,
            cityList,
            onSearchChange: handleSearchChange,
            onChange: handleFilterChange,
          }}
        />
      </Box>
      <StudentTable
        {...{
          studentList,
          cityMap,
          onSort: handleOrderChange,
          filter,
          onRemove: handleRemoveStudent,
          onEdit: handleEditStudent,
        }}
      />
      <Box className={classes.pagination}>
        <Pagination
          {...{
            count,
            page: pagination?._page,
            onChange: handlePageChange,
          }}
        />
      </Box>
    </Box>
  );
}
