import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ICity, ICityMap, IListResponse } from "models";


export interface CityState {
  list: ICity[];
  loading: boolean;
}

const initialState: CityState = {
  list: [],
  loading: false
}

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<IListResponse<ICity>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  }
})


export const cityActions = citySlice.actions;

export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) => cityList.reduce((map: ICityMap, city) => {
  map[city.code] = city;
  return map;
}, {}))

const cityReducer = citySlice.reducer;
export default cityReducer;