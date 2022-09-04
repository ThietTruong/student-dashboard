import { Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams } from '../../../models';
import { Student } from '../../../models/student';
import { selectCityList, selectCityMap } from '../../city/city.slice';
import StudentFilters from '../components/studentFilters';
import StudentTable from '../components/studentTable';
import {
  selectStudentList,
  selectStudentListFilter,
  selectStudentListloading,
  selectStudentListPagination,
  studentActions,
} from '../student.slice';

export interface ListPageProps {}
const useStyle = makeStyles(() => ({
  root: {
    paddingTop: '16px',
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
}));
export default function ListPage(props: ListPageProps) {
  const dispath = useAppDispatch();
  const classes = useStyle();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentListPagination);
  const filter = useAppSelector(selectStudentListFilter);
  const loading = useAppSelector(selectStudentListloading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  useEffect(() => {
    dispath(studentActions.fetchStudentList(filter));
  }, [dispath, filter]);
  const handlePageChange = (e: any, page: number) => {
    dispath(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispath(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleChangeFilter = (newFilter: ListParams) => {
    dispath(studentActions.setFilter(newFilter));
  };

  const handleRemvoeStudent = async (student: Student) => {
    try {
      await studentApi.remove(student.id || '');
      const newFilter = { ...filter };
      dispath(studentActions.setFilter(newFilter));
    } catch (error) {
      //Toast
      console.log('Fail to remove student.', error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    navigate(`${pathname}/${student.id}`);
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${pathname}/add`}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleChangeFilter}
        />
      </Box>
      {/* Student tbale */}

      <StudentTable
        cityMap={cityMap}
        studentList={studentList}
        onRemove={handleRemvoeStudent}
        onEdit={handleEditStudent}
      />
      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          page={pagination && pagination._page}
          count={
            pagination && Math.ceil(pagination._totalRows / pagination._limit)
          }
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
