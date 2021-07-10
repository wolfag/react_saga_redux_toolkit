import { PayloadAction } from '@reduxjs/toolkit';
import counterSaga from 'features/counter/counterSaga';
import { all, takeEvery } from 'redux-saga/effects';

function* helloSaga() {
  console.log('hello saga');
}

export default function* rootSaga() {
  console.log('root saga');
  yield all([helloSaga(), counterSaga()]);
}
