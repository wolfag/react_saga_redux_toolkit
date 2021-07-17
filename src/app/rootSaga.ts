import { PayloadAction } from '@reduxjs/toolkit';
import { authSaga } from 'features/auth/authSaga';
import counterSaga from 'features/counter/counterSaga';
import { all, takeEvery } from 'redux-saga/effects';


export default function* rootSaga() {
  console.log('root saga');
  yield all([counterSaga(), authSaga()]);
}
