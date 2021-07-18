import { cityApi } from "api";
import { ICity, IListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

function* fetchCityList() {
  try {
    const response: IListResponse<ICity> = yield call(cityApi.getAll);

    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log({ fetchCityList: { ...error } });
    yield put(cityActions.fetchCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList)
}