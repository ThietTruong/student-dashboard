import { PeopleAlt } from '@mui/icons-material';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './conponents/statisticItem';
import StudentRankingList from './conponents/studentRankingList';
import Widget from './conponents/widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboard.slice';

export interface DashboardProps {}

const useStyle = makeStyles(() => ({
  root: {
    position: 'relative',
    paddingTop: '32px',
  },
  loading: {
    position: 'absolute',
    top: '-16px',
    left: '0px',
    with: '100%',
  },
}));

export function Dashboard(props: DashboardProps) {
  const dispath = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const classes = useStyle();

  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  useEffect(() => {
    dispath(dashboardActions.fetchData());
  }, [dispath]);
  return (
    <Box className={classes.root}>
      {/* ;Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistics section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            lable="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            lable="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            lable="mark >= 8"
            value={statistics.highMartCount}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            lable="mark <=5"
            value={statistics.lowMartCount}
          />
        </Grid>
      </Grid>
      {/* All student ranking */}
      <Box mt={5}>
        <Typography variant="h4" align="left">
          All student
        </Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <Widget title="Student  width  highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Ranking by city */}
      <Box mt={5}>
        <Typography variant="h4" align="left">
          All student
        </Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid item xs={12} md={6} xl={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
