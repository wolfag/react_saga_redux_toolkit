import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IStudent } from "models";

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: IStudent[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: IStudent[];
  lowestStudentList: IStudent[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: []
}

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
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload
    },
    setHighestStudentList(state, action: PayloadAction<IStudent[]>) {
      state.highestStudentList = action.payload
    },
    setLowestStudentList(state, action: PayloadAction<IStudent[]>) {
      state.lowestStudentList = action.payload
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  }
});

export const dashboardActions = dashboardSlice.actions;

export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;