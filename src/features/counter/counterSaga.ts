import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function* log(action: PayloadAction) {
  console.log('log:', action);
}

function* handleInc(action: PayloadAction<number>) {
  console.log('handleInc waiting');

  yield call(delay, 1000);

  console.log('handleInc waiting done');

  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log('counter saga');
  // yield takeEvery('*', log);
  yield takeEvery(incrementSaga.toString(), handleInc);
  // yield takeLatest(incrementSaga.toString(), handleInc);
}
