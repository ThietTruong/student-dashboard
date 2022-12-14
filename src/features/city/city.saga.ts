import { call, put, takeLatest } from 'redux-saga/effects';
import cityApi from '../../api/cityApi';
import { City, ListResponse } from '../../models';
import { cityActions } from './city.slice';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('Fail to fetch city list', error);
    yield put(cityActions.fetchCityListFail());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
