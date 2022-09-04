import createSagaMiddleware from '@redux-saga/core';
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import cityReducer from '../features/city/city.slice';
import counterReducer from '../features/counter/counterSlice';
import { dashboardReducer } from '../features/dashboard/dashboard.slice';
import { studentReducer } from '../features/student/student.slice';
import { history } from '../utils';

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  // ...options
});

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      // immutableCheck: true
    }).concat(sagaMiddleware, logger, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
