import { fromJS } from 'immutable';
import { getTrackById } from 'client/redux/modules/entities';
import { CLEAR_PLAY_QUEUE } from './playlist';

/* Constants */
export const LOOP = 'LOOP'; // Loop through the playlist, when it hits the end, start all over from the beginning
export const REPEAT = 'REPEAT'; // Repeat current song.
export const SHUFFLE = 'SHUFFLE'; // Shuffle playing, will not play songs that are played already.
export const DEFAULT_MODE = LOOP;
export const INITIAL_VOLUME = 0.5;
export const NEXT = 'NEXT';
export const PREV = 'PREV';

/* Player Action Types */
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const UPDATE_TIME = 'UPDATE_TIME';
export const LOAD_PLAYER_PLAYLIST = 'LOAD_PLAYER_PLAYLIST';
export const CHANGE_SONG = 'CHANGE_SONG';
export const BEGIN_SEEK = 'BEGIN_SEEK';
export const END_SEEK = 'END_SEEK';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const BEGIN_VOLUME_SEEK = 'BEGIN_VOLUME_SEEK';
export const END_VOLUME_SEEK = 'END_VOLUME_SEEK';
export const CHANGE_PLAY_MODE = 'CHANGE_PLAY_MODE';
export const CHANGE_VISIBLE_PLAYLIST = 'CHANGE_VISIBLE_PLAYLIST';

/* Player Saga Action Types*/
export const SAGA_CHANGE_SONG_AND_PLAY = 'SAGA_CHANGE_SONG_AND_PLAY';
export const SAGA_UPDATE_TIME_ON_PLAY = 'SAGA_UPDATE_TIME_ON_PLAY';
export const SAGA_UPDATE_TIME_ON_SEEK = 'SAGA_UPDATE_TIME_ON_SEEK';
export const SAGA_UPDATE_TIME_AND_END_SEEK = 'SAGA_UPDATE_TIME_AND_END_SEEK';
export const SAGA_UPDATE_VOLUME_AND_END_SEEK = 'SAGA_UPDATE_VOLUME_AND_END_SEEK';
export const SAGA_PLAY_NEXT_SONG = 'SAGA_PLAY_NEXT_SONG';
export const SAGA_PLAY_PREV_SONG = 'SAGA_PLAY_PREV_SONG';
export const SAGA_CHANGE_PLAY_MODE = 'SAGA_CHANGE_PLAY_MODE';

export const SAGA_TOGGLE_MUTE = 'SAGA_TOGGLE_MUTE';
export const MUTE = 'MUTE';
export const CLEAR_TIME = 'CLEAR_TIME';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const INIT_SHUFFLE = 'INIT_SHUFFLE';
export const SHUFFLE_DRAW = 'SHUFFLE_DRAW';
export const SHUFFLE_DISCARD = 'SHUFFLE_DISCARD';

/* Pure actions */
export const beginSeek = () => ({ type: BEGIN_SEEK });

export const endSeek = () => ({ type: END_SEEK });

export const playSong = () => ({ type: PLAY_SONG });

export const pauseSong = () => ({ type: PAUSE_SONG });

export const beginVolumeSeek = () => ({ type: BEGIN_VOLUME_SEEK });

export const endVolumeSeek = () => ({ type: END_VOLUME_SEEK });

export const mute = () => ({ type: MUTE });

export const clearTime = () => ({ type: CLEAR_TIME });

export const updateTime = currentTime => ({
  type: UPDATE_TIME,
  payload: currentTime,
});

/**
 * Change the current song to newSong.
 * @param  {Track(Record)} newSong The Track Record model.
 * @return {Object} Action
 */
export const changeSong = trackId => ({
  type: CHANGE_SONG,
  payload: trackId,
});

export const changeVolume = volume => ({
  type: CHANGE_VOLUME,
  payload: volume,
});

export const changePlayMode = mode => ({
  type: CHANGE_PLAY_MODE,
  payload: mode,
});

// Saga Actions (Actions that will trigger a saga and execute side effects)
// Player logic are implemented in sagas
export const sagaToggleMute = () => ({
  type: SAGA_TOGGLE_MUTE,
});

export const sagaChangeSongAndPlay = (trackId, playlist) => ({
  type: SAGA_CHANGE_SONG_AND_PLAY,
  payload: {
    trackId,
    playlist,
  },
});

export const sagaChangePlayMode = mode => ({
  type: SAGA_CHANGE_PLAY_MODE,
  payload: mode,
});

export const sagaPlayNextSong = () => ({
  type: SAGA_PLAY_NEXT_SONG,
});

export const sagaPlayPrevSong = () => ({
  type: SAGA_PLAY_PREV_SONG,
});

export const sagaUpdateTimeOnPlay = newTime => ({
  type: SAGA_UPDATE_TIME_ON_PLAY,
  payload: newTime,
});

export const sagaUpdateTimeOnSeek = newTime => ({
  type: SAGA_UPDATE_TIME_ON_SEEK,
  payload: newTime,
});

export const sagaUpdateTimeAndEndSeek = newTime => ({
  type: SAGA_UPDATE_TIME_AND_END_SEEK,
  payload: newTime,
});

export const sagaUpdateVolumeAndEndSeek = newVolume => ({
  type: SAGA_UPDATE_VOLUME_AND_END_SEEK,
  payload: newVolume,
});

/* Player Reducer */
const initialState = fromJS({
  currentTime: 0,
  volume: INITIAL_VOLUME,
  trackId: undefined,
  playing: false,
  seeking: false,
  volumeSeeking: false,
  duration: 0,
  mode: DEFAULT_MODE,
});

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_SONG:
      return state.set('playing', true);

    case PAUSE_SONG:
      return state.set('playing', false);

    case CHANGE_SONG:
      return state.set('trackId', action.payload);

    case UPDATE_TIME:
      return state.set('currentTime', action.payload);

    case BEGIN_SEEK:
      return state.set('seeking', true);

    case END_SEEK:
      return state.set('seeking', false);

    case CHANGE_VOLUME:
      return state.set('volume', action.payload);

    case BEGIN_VOLUME_SEEK:
      return state.set('volumeSeeking', true);

    case END_VOLUME_SEEK:
      return state.set('volumeSeeking', false);

    case CHANGE_PLAY_MODE:
      return state.set('mode', action.payload);

    case MUTE:
      return state.set('volume', 0);

    case CLEAR_TIME:
      return state.set('currentTime', 0);

    case CLEAR_PLAY_QUEUE:
      return initialState;
    default:
      return state;
  }
}


/* Selectors */
export const getPlayerState = state => state.get('player');
export const getPlayerTrackId = state => getPlayerState(state).get('trackId');
export const isPlayerPlaying = state => getPlayerState(state).get('playing');
export const isPlayerSeeking = state => getPlayerState(state).get('seeking');
export const getCurrentTime = state => getPlayerState(state).get('currentTime');
export const getPlayerMode = state => getPlayerState(state).get('mode');
export const isVolumeSeeking = state => getPlayerState(state).get('volumeSeeking');
export const getCurrentVolume = state => getPlayerState(state).get('volume');

// (Reselect) Return the current player track (Immutable.Record)
export function getCurrentPlayerTrack(state) {
  const trackId = getPlayerTrackId(state);
  return getTrackById(state, trackId);
}

/**
 * Return if the current track(byId) is loaded in player. (Paused or Playing)
 * @param  {[type]} state [description]
 * @param  {[type]} id    [description]
 * @return {[type]}       [description]
 */
export function isTrackActive(state, trackId) {
  const playerTrackId = getPlayerTrackId(state);
  if (playerTrackId && trackId) {
    return playerTrackId.toString() === trackId.toString();
  }
  return false;
}

export const isTrackPlaying = (state, id) => isTrackActive(state, id) && isPlayerPlaying(state);

// Return if the specific song is playing or not
