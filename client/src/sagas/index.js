import { fork, all } from 'redux-saga/effects';
import * as usersSagas from './usersSaga';

export default function* rootSaga() {
    yield all([
        ...Object.values(usersSagas),
    ].map(fork));
}