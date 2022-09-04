import counterSaga from '../features/counter/couterSage';
import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import dashboardSaga from '../features/dashboard/dashboard.saga';
import studentSaga from '../features/student/student.saga';
import citySaga from '../features/city/city.saga';

export default function* rootSaga() {
  yield all([
    counterSaga(),
    authSaga(),
    dashboardSaga(),
    studentSaga(),
    citySaga(),
  ]);
}
