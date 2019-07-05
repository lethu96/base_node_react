import { takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import { registerUser, loginUser } from '../api/user';
import * as Types from '../constants/types';


function* login(data) {
    try {
        const response = yield call(loginUser, data);
        console.log('saga', response)
        const token = response.data.token;

        // dispatch a success action to the store with token
        yield put({ type: Types.LOGIN_SUCCESS, token });

    } catch (error) {
        const errors = error.response.data.msg;
        // dispatch a failure action to the store with the error
        yield put({ type: Types.LOGIN_FAIL, errors });
    }
}


function* register(data) {
    try {
        const response = yield call(registerUser, data);
        const user = response.data.data;

        // dispatch a success action to the store with token
        yield put({ type: Types.REGISTER_SUCCESS, user });

    } catch (error) {
        const errors = error.response.data.msg;
        // dispatch a failure action to the store with the error
        yield put({ type: Types.REGISTER_FAIL, errors });
    }
}

export function* watchAuthSaga() {
    yield takeEvery(Types.ACTION_LOGIN, login);
    yield takeEvery(Types.ACTION_REGISTER, register);
}