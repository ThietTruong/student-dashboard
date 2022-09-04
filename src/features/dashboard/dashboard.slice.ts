import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Student } from '../../models/student';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMartCount: number;
  lowMartCount: number;
}
export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}
export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  hightestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}
const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMartCount: 0,
    lowMartCount: 0,
  },
  hightestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFail(state) {
      state.loading = false;
    },
    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.hightestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

//actions
export const dashboardActions = dashboardSlice.actions;

//selector
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) =>
  state.dashboard.statistics;
export const select = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) =>
  state.dashboard.hightestStudentList;
export const selectLowestStudentList = (state: RootState) =>
  state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) =>
  state.dashboard.rankingByCityList;

//reducers
export const dashboardReducer = dashboardSlice.reducer;
export default dashboardSlice;
