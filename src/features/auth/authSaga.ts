import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { take, fork, delay, call, put } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(100);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: '1',
        name: 'Thiet Truong',
      })
    );
    yield put(push('/admin'));
  } catch (error) {}
}
function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
}

function* watchLoginFollow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );

      yield call(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
    yield put(push('/login'));
  }
}

export default function* authSaga() {
  yield fork(watchLoginFollow);
}
