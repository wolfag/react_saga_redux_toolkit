import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IListParams, IListResponse, IPaginationParams, IStudent } from "models";

export interface StudentState {
  loading: boolean;
  list: IStudent[];
  filter: IListParams;
  pagination: IPaginationParams;
}


const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 20,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 20
  }
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<IListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<IListResponse<IStudent>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<IListParams>) {
      state.filter = action.payload;
    }
  }
})

export const studentActions = studentSlice.actions;

export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

const studentReducer = studentSlice.reducer;
export default studentReducer;