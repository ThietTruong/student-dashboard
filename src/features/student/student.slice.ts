import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ListParams, ListResponse, PaginationParams } from '../../models';
import { Student } from '../../models/student';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}
const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _limit: 15,
    _page: 1,
  },
  pagination: {
    _limit: 15,
    _page: 1,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(
      state,
      action: PayloadAction<ListResponse<Student>>
    ) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFailed(state, action: PayloadAction<string>) {
      console.log('error');
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

//actions
export const studentActions = studentSlice.actions;

//select
export const selectStudentListloading = (state: RootState) =>
  state.student.loading;
export const selectStudentListFilter = (state: RootState) =>
  state.student.filter;
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentListPagination = (state: RootState) =>
  state.student.pagination;

//reducer
export const studentReducer = studentSlice.reducer;
export default studentSlice;
