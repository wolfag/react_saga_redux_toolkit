import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatSharp, HearingTwoTone, NotificationsTwoTone, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { ReactElement, useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
  selectStatistics,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export function Dashboard(): ReactElement {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  const statistics = useAppSelector(selectStatistics);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  // console.log({ loading, highestStudentList, lowestStudentList, rankingByCityList, statistics });

  return (
    <Box className={classes.root}>
      {/* loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistic */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            {...{
              icon: <PeopleAlt fontSize="large" color="primary" />,
              label: 'male',
              value: statistics.maleCount,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            {...{
              icon: <NotificationsTwoTone fontSize="large" color="primary" />,
              label: 'female',
              value: statistics.femaleCount,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            {...{
              icon: <ChatSharp fontSize="large" color="primary" />,
              label: 'mark >=8',
              value: statistics.highMarkCount,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            {...{
              icon: <HearingTwoTone fontSize="large" color="primary" />,
              label: 'mark <=5',
              value: statistics.lowMarkCount,
            }}
          />
        </Grid>
      </Grid>

      {/* All student ranking */}
      <Box mt={4}>
        <Typography variant="h4">All Student</Typography>
        <Box mt={2} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student with highest mark">
              <StudentRankingList
                {...{
                  studentList: highestStudentList,
                }}
              />
            </Widget>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student with lowest mark">
              <StudentRankingList
                {...{
                  studentList: lowestStudentList,
                }}
              />
            </Widget>
          </Grid>
        </Grid>
      </Box>

      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">Ranking by City</Typography>
        <Box mt={2} />
        <Grid container spacing={3}>
          {rankingByCityList.map((ranking) => (
            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
              <Widget title={ranking.cityName}>
                <StudentRankingList
                  {...{
                    studentList: ranking.rankingList,
                  }}
                />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}