import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import SongCard from '../components/SongCard/SongCard';
import {
  playSong,
  sagaChangeSongAndPlay,
  pauseSong
} from '../../../modules/player/actions';

import { startLikeSong, startUnlikeSong } from '../../../modules/user/actions';

import {
  isSongLiked,
  getSongImage,
  getSongTitle,
  getSongUserAvatar,
  getSongUsername,
  getSingleSongIsActive,
  getSingleSongPlayingState
} from '../../../modules/reducers';

const mapStateToProps = (state, { song }) => ({
  // This is just like passing down props!
  isLiked: isSongLiked(state, song.id),
  songImage: getSongImage(song),
  title: getSongTitle(song),
  userImage: getSongUserAvatar(song),
  username: getSongUsername(song),
  isActive: getSingleSongIsActive(state, song.id),
  isPlaying: getSingleSongPlayingState(state, song.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Fire if the user click on a song card that is active
  handlePlaySong() { dispatch(playSong()); },
  // Fire if the user click on a song card that is not active
  handleChangeSong() { dispatch(sagaChangeSongAndPlay(ownProps.song)); },
  handlePauseSong() { dispatch(pauseSong()); },
  handleLikeClick() {
    dispatch(startLikeSong(ownProps.song.id));
  },
  handleUnlikeClick() {
    dispatch(startUnlikeSong(ownProps.song.id));
  },
  handleCopyToClipboard() {
    copy(ownProps.song.permalink_url);
    dispatch({
      type: 'COPY_SUCCESS',
      payload: {
        message: 'Song URL copied to clipboard'
      }
    });
  }
});

const SongCardContainer = connect(mapStateToProps,
  mapDispatchToProps)(SongCard);

export default SongCardContainer;