/* Action Creators */
import {
  updateVisiblePlaylist,
  appendToVisiblePlaylist,
} from 'client/features/playlist/playlistActions';
import { notificationWarning } from 'client/features/notification/notificationActions';

import { fetchCharts, fetchMoreCharts } from './chartsApi';

import {
  isChartsFetching,
  getChartsByGenre,
  getCurrentCharts,
  getChartsSelectedGenre,
  getChartsNextHref,
} from './chartsSelectors';

import {
  TOP_COUNT,
  CHARTS_GENRE_CHANGE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_FAIL,
  CHARTS_CLEAR_STATE,
} from './chartsConsts';

export function clearChartsState() {
  return {
    type: CHARTS_CLEAR_STATE,
  };
}

export function changeGenre(genre) {
  return {
    type: CHARTS_GENRE_CHANGE,
    payload: {
      genre,
    },
  };
}

export function requestCharts() {
  return {
    type: CHARTS_REQUEST,
  };
}

export function receiveCharts(normalized, playlistName) {
  return {
    type: CHARTS_RECEIVE,
    payload: {
      ...normalized,
      playlistName,
    },
  };
}

export function failedToFetchCharts() {
  return {
    type: CHARTS_FAIL,
  };
}

/* Side Effects */
export function loadChartsPage(genre) {
  return async (dispatch, getState) => {
    const state = getState();
    if (!getChartsByGenre(state, genre)) {
      dispatch(requestCharts());
      try {
        const normalizedCharts = await fetchCharts(genre);
        dispatch(receiveCharts(normalizedCharts, genre));
        dispatch(updateVisiblePlaylist(normalizedCharts.result));
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch songs!'));
      }
    }
  };
}

export function loadMoreCharts() {
  return async (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    const nextHref = getChartsNextHref(state);
    const currentCharts = getCurrentCharts(state);

    if (!chartsFetching && currentCharts.length < TOP_COUNT && nextHref) {
      dispatch(requestCharts());
      const genre = getChartsSelectedGenre(state);
      try {
        const normalizedCharts = await fetchMoreCharts(nextHref);
        dispatch(receiveCharts(normalizedCharts, genre));
        dispatch(appendToVisiblePlaylist(normalizedCharts.result));
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch more songs!'));
      }
    }
  };
}
