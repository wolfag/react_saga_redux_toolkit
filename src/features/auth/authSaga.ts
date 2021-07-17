import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { fork, take, call, delay, put } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    console.log('login')
    localStorage.setItem('access_token', 'aaa')

    yield put(authActions.loginSuccess({ id: 1, name: 'wolfag' }))

    // redirect to admin page
    yield put(push('/admin/dashboard'));
  } catch (error) {
    console.log({ handleLogin: { ...error } })
    yield put(authActions.loginFailed(error.message))
  }
}

function* handleLogout() {
  yield delay(500);
  console.log('logout')
  localStorage.removeItem('access_token')
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    console.log('watchlogin')
    const isLoggedIn = !!localStorage.getItem('access_token');

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout); // call(block): wait logout before next cycle
  }
}


export function* authSaga() {
  yield fork(watchLoginFlow)
}