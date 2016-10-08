import { connect } from 'react-redux';
import { getPlayerMode, getShowPlaylist } from 'client/modules/reducers';
import { sagaChangePlayMode, togglePlaylist } from 'client/modules/player/actions';
import { REPEAT, SHUFFLE } from 'client/constants/PlayerConstants';
import PlayerModeControls from '../components/PlayerModeControls';

const mapStateToProps = state => ({
  mode: getPlayerMode(state),
  isPlaylistShown: getShowPlaylist(state)
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(sagaChangePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(sagaChangePlayMode(SHUFFLE)); },
  onTogglePlaylistClick: () => { dispatch(togglePlaylist()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);