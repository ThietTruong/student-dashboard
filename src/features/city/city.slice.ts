import { Label } from '@mui/icons-material';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { City, ListResponse } from '../../models';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.list = action.payload.data;
      state.loading = false;
    },
    fetchCityListFail(state) {
      state.loading = false;
    },
  },
});

//Action
export const cityActions = citySlice.actions;
//Selector
export const selectCityListLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({ label: city.name, value: city.code }))
);
//Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
