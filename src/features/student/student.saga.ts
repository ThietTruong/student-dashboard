import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import studentApi from '../../api/studentApi';
import { ListParams, ListResponse } from '../../models';
import { Student } from '../../models/student';
import { studentActions } from './student.slice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    );
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Fail to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed);
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}
export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
  yield debounce(
    500,
    studentActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}
