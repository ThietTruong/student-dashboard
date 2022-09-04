import { takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {}

export default function* counterSaga() {
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
