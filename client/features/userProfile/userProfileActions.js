import { mergeEntities } from 'features/entities/entitiesActions';
import { mergeVisiblePlaylist, updateVisiblePlaylistName } from 'features/playlist/playlistActions';
import * as types from './userProfileActionTypes';
import { getUserTracksNextHref, isUserTracksFetching } from './userProfileSelectors';
import {
  fetchProfiledUser,
  fetchProfiledUserTracks,
  fetchMoreProfiledUserTracks,
} from './userProfileApi';

/* Action Creators*/
export function resetUserProfileState() {
  return {
    type: types.USER_PROFILE_STATE_RESET,
  };
}

export function startFetchingProfiledUser() {
  return { type: types.USER_PROFILE_USER_FETCH_START };
}

export function stopFetchingProfiledUser() {
  return { type: types.USER_PROFILE_USER_FETCH_STOP };
}

export function updateProfiledUser(userId) {
  return {
    type: types.USER_PROFILE_USER_UPDATE,
    payload: {
      userId,
    },
  };
}

export function failedToFetchUser() {
  return { type: types.USER_PROFILE_USER_FAIL };
}

export function startFetchingUserTracks() {
  return { type: types.USER_PROFILE_TRACKS_FETCH_START };
}

export function stopFetchingUserTracks() {
  return { type: types.USER_PROFILE_TRACKS_FETCH_STOP };
}

export function updateUserTracksNextHref(nextHref) {
  return {
    type: types.USER_PROFILE_TRACKS_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function failedToFetchUserTracks() {
  return {
    type: types.USER_PROFILE_TRACKS_FAIL,
  };
}

export function receiveUser(normalizedUser) {
  return (dispatch) => {
    dispatch(mergeEntities(normalizedUser.entities));
    dispatch(updateProfiledUser(normalizedUser.result));
    dispatch(stopFetchingProfiledUser());
  };
}

export function receiveTracks(normalizedTracks) {
  return (dispatch) => {
    dispatch(mergeEntities(normalizedTracks.entities));
    dispatch(mergeVisiblePlaylist(normalizedTracks.result));
    dispatch(updateUserTracksNextHref(normalizedTracks.nextHref));
    dispatch(stopFetchingUserTracks());
  };
}

// Should load user first and then the tracks
export function loadUserProfileData(userId) {
  return async (dispatch) => {
    dispatch(updateProfiledUser(userId));
    dispatch(updateVisiblePlaylistName(`user-${userId}`));
    try {
      dispatch(startFetchingProfiledUser());
      dispatch(startFetchingUserTracks());
      // No need to group them together
      const [normalizedUser, normalizedTracks] = await Promise.all([
        fetchProfiledUser(userId),
        fetchProfiledUserTracks(userId),
      ]);

      dispatch(receiveUser(normalizedUser));
      dispatch(receiveTracks(normalizedTracks));
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadMoreUserTracks() {
  return async (dispatch, getState) => {
    const state = getState();
    const fetching = isUserTracksFetching(state);

    // nextHref will be undefined if there is no more data to fetch
    const curNextHref = getUserTracksNextHref(state);
    // console.log('NextHref:', nextHref);
    if (!fetching && curNextHref) {
      try {
        dispatch(startFetchingUserTracks());
        const normalizedTracks = await fetchMoreProfiledUserTracks(curNextHref);
        dispatch(receiveTracks(normalizedTracks));
      } catch (err) {
        console.log(err);
        // dispatch(failedToFetchUserTracks());
      }
    }
  };
}
