import { PayloadAction } from "@reduxjs/toolkit";
import { studentApi } from "api";
import { IListParams, IListResponse, IStudent } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<IListParams>) {
  try {
    const response: IListResponse<IStudent> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log({ fetchStudentList: { ...error } })
    yield put(studentActions.fetchStudentListFailed());
  }
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
}