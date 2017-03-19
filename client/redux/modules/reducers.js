/* Main reducer file */
import {combineReducers} from 'redux-immutable';

import * as fromPlayer from './player';
import * as fromSearch from './search';
import * as fromUser from './user';
import * as fromArtist from './artist';
import * as fromCharts from './charts';
import * as fromPlaylist from './playlist';
import * as fromTrack from './track';

const rootReducer = combineReducers({
    // playlists: fromPlaylists.default,
    charts: fromCharts.default,
    playlist: fromPlaylist.default,
    player: fromPlayer.default,
    user: fromUser.default,
    search: fromSearch.default,
    artist: fromArtist.default,
    track: fromTrack.default
});

/* From Charts */
export const getChartsGenre = state => fromCharts.getGenre(state.get('charts'));
export const getChartsTrackMap = state => fromCharts.getTrackMap(state.get('charts'));
export const getIsChartsFetching = state => fromCharts.getIsFetching(state.get('charts'));

/* From Track */
export const getIsTrackFetching = state => fromTrack.isTrackFetching(state.get('track'));
export const getTrackRecord = state => fromTrack.getTrack(state.get('track'));
/* From Playlist */
export const getShowPlaylist = state => fromPlaylist.getShowPlaylist(state.get('playlist'));
export const getPlaylistAsOrderedMap = state => fromPlaylist.getPlaylistAsOrderedMap(state.get('playlist'));
export const getPlaylistAsArray = state => fromPlaylist.getPlaylistAsArray(state.get('playlist'));

/* From Artist */
export const getArtistRecord = state => fromArtist.getArtistRecord(state.get('artist'));
export const getArtistTrackMap = state => fromArtist.getArtistTrackMap(state.get('artist'));
export const getArtistFetchState = state => fromArtist.getIsArtistFetching(state.get('artist'));
export const getArtistTracksFetchState = state => fromArtist.getIsTrackFetching(state.get('artist'));

/* From Search */
export const getSearchTrackMap = state => fromSearch.getTrackMap(state.get('search'));
export const getSearchArtistMap = state => fromSearch.getArtistMap(state.get('search'));
export const getSearchTrackNextHref = state => fromSearch.getTrackNextHref(state.get('search'));
export const getSearchArtistNextHref = state => fromSearch.getArtistNextHref(state.get('search'));
export const isSearching = state => fromSearch.isFetching(state.get('search'));
export const isSearchResultShown = state => fromSearch.isShown(state.get('search'));
export const getSearchResults = state => fromSearch.getSearchResults(state.get('search'));

/* From user */
export const isSongLiked = (state, songId) => {
    const likes = fromUser.getLikes(state.get('user'));
    return (songId in likes);
};
export const getLikes = state => fromUser.getLikes(state.get('user'));
export const getUid = state => fromUser.getUid(state.get('user'));
export const getDisplayName = state => fromUser.getDisplayName(state.get('user'));
export const getPhotoUrl = state => fromUser.getPhotoUrl(state.get('user'));

/* From player */
export const getCurrentPlayerTrack = state => fromPlayer.getCurrentTrack(state.get('player'));
export const getShuffleDraw = state => fromPlayer.getShuffleDraw(state.get('player'));
export const getShuffleDiscard = state => fromPlayer.getShuffleDiscard(state.get('player'));
export const shuffleInitialized = state => fromPlayer.shuffleInitialized(state.get('player'));
export const getPlayingState = state => fromPlayer.getPlayingState(state.get('player'));
export const getCurrentVolume = state => fromPlayer.getCurrentVolume(state.get('player'));
export const getVolumeSeekState = state => fromPlayer.getVolumeSeekState(state.get('player'));
export const getCurrentTime = state => fromPlayer.getCurrentTime(state.get('player'));
export const getSeekState = state => fromPlayer.getSeekState(state.get('player'));
export const getPlayerMode = state => fromPlayer.getPlayerMode(state.get('player'));

/**
 * Return if the current track(byId) is loaded in player
 * @param  {[type]} state [description]
 * @param  {[type]} id    [description]
 * @return {[type]}       [description]
 */
export const getSingleSongIsActive = (state, id) => {
    const currentSongId = getCurrentPlayerTrack(state).getId();
    if (currentSongId && id) {
        return currentSongId.toString() === id.toString();
    }
    return false;
};

// Return if the specific song is playing or not
export const getSingleSongPlayingState = (state, id) => getSingleSongIsActive(state, id) && getPlayingState(state);

export default rootReducer;
