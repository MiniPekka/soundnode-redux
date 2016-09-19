import { put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../constants/ActionTypes';
import { updateTime, endSeek, changeVolume, endVolumeSeek } from '../actions/player';
import {
  getCurrentTime,
  getSeekState
} from '../reducers';

function* convertAndUpdateTime(rawTime) {
  const newTime = yield call(Math.floor, rawTime); // Convert float to int
  const currentTime = yield select(getCurrentTime);
  if (newTime !== currentTime) {
    yield put(updateTime(newTime));
  }
}


function* updateTimeRegular({ payload }) {
  const isSeeking = yield select(getSeekState);
  if (!isSeeking) {
      yield call(convertAndUpdateTime, payload);
  }
}


function* updateTimeSeek({ payload }) {
  yield call(convertAndUpdateTime,payload);
}

function* updateTimeAndEndSeek({ payload }) {
  yield call(convertAndUpdateTime, payload);
  yield put(endSeek());
}

function* updateVolumeAndEndSeek({ payload }) {
  yield put(changeVolume(payload));
  yield put(endVolumeSeek());
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchRegularTimeUpdate() {
  yield takeEvery(ActionTypes.UPDATE_TIME_ON_PLAY, updateTimeRegular);
}

export function* watchSeekTimeUpdate() {
  yield takeEvery(ActionTypes.UPDATE_TIME_ON_SEEK, updateTimeSeek);
}

export function* watchEndSeekTime() {
  yield takeEvery(ActionTypes.UPDATE_TIME_AND_END_SEEK, updateTimeAndEndSeek);
}

export function* watchEndSeekVolume() {
  yield takeEvery(ActionTypes.UPDATE_VOLUME_AND_END_SEEK, updateVolumeAndEndSeek);
}
