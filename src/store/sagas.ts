import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchCounterFromAPI } from "../api/index";
import {
  fetchCounterRequest,
  fetchCounterSuccess,
  fetchCounterFailure,
} from "./slice";

function* fetchCounterWorker() {
  try {
    const value = yield call(fetchCounterFromAPI);
    yield put(fetchCounterSuccess(value));
  } catch (error) {
    yield put(fetchCounterFailure());
  }
}

export function* counterSaga() {
  yield takeLatest(fetchCounterRequest.type, fetchCounterWorker);
}

export default function* rootSaga() {
    yield all([
      counterSaga()
    ]);
  }