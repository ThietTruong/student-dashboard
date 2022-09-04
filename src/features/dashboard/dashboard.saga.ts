import { all, call, put, takeLatest } from 'redux-saga/effects';
import cityApi from '../../api/cityApi';
import studentApi from '../../api/studentApi';
import { City, ListResponse } from '../../models';
import { Student } from '../../models/student';
import { dashboardActions, RankingByCity } from './dashboard.slice';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 8 }),
  ]);

  const statisticList = responseList.map(
    (statistic) => statistic.pagination._totalRows
  );
  const [maleCount, femaleCount, highMartCount, lowMartCount] = statisticList;
  if (maleCount && femaleCount && highMartCount && lowMartCount) {
    yield put(
      dashboardActions.setStatistics({
        maleCount,
        femaleCount,
        highMartCount,
        lowMartCount,
      })
    );
  }
}
function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _order: 'desc',
    _sort: 'mark',
  });
  yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _order: 'asc',
    _sort: 'mark',
  });
  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  //Fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
  // Fetch ranking per city
  const callList = cityList.map((city) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _order: 'desc',
      city: city.code,
    })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);

  const rankingCityList: Array<RankingByCity> = responseList.map(
    (res, resIndex) => ({
      cityId: cityList[resIndex].code,
      cityName: cityList[resIndex].name,
      rankingList: res.data,
    })
  );
  yield put(dashboardActions.setRankingByCityList(rankingCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Failed data to fetch dashboard data', error);
    yield put(dashboardActions.fetchDataFail());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
