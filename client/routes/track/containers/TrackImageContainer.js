import { connect } from 'react-redux';
import { t500x500 } from 'client/constants/ImageConstants';
import { formatPlaybacks, formatLikes, formatImageUrl } from 'client/utils/FormatUtils';
import { isTrackLiked, startLikeSong, startUnlikeSong } from 'client/redux/modules/user';
import { updatePlaylistIfNeeded } from 'client/redux/modules/playlist';

import {
  playSong,
  pauseSong,
  changeSongAndPlay,
  isTrackActive,
  isTrackPlaying,
} from 'client/redux/modules/player';

import TrackImage from '../components/TrackImage';

// handleImageClick,
// handleToggleLike
const mapStateToProps = (state, { track }) => {
  const trackId = track.get('id');
  return {
    artworkUrl: formatImageUrl(track.get('artworkUrl'), t500x500),
    playbackCount: formatPlaybacks(track.get('playbackCount')),
    likeCount: formatLikes(track.get('favoritingsCount')),
    playing: isTrackPlaying(state, trackId),
    liked: isTrackLiked(state, trackId),
    active: isTrackActive(state, trackId),
  };
};

const mergeProps = (stateProps, { dispatch }, { track }) => {
  const { playing, active, liked } = stateProps;
  const trackId = track.get('id');
  return {
    ...stateProps,
    // Extract the logic: same logic goes in SongCardImage click
    handleImageClick() {
      if (active) {
        dispatch(playing ? pauseSong() : playSong());
      } else {
        dispatch(updatePlaylistIfNeeded(trackId));
        dispatch(changeSongAndPlay(trackId));
      }
    },
    handleToggleLike() {
      dispatch(liked ? startUnlikeSong(trackId) : startLikeSong(trackId));
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(TrackImage);