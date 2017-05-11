import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import FontAwesomeButton from 'client/common/components/Buttons/FontAwesomeButton';
import IconButton from 'client/common/components/Buttons/IconButton';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }

  renderPlayPauseButton() {
    const { playing, onPauseClick, onPlayClick } = this.props;
    return (
      <IconButton
        title="Play"
        btnClassName="icon-button player-button"
        iconClassName={playing ? 'icon ion-ios-pause' : 'icon ion-ios-play'}
        onClick={playing ? onPauseClick : onPlayClick}
      />
    );
  }

  renderForwardButton() {
    const { onNextClick } = this.props;
    return (
      <IconButton
        title="Next"
        btnClassName="icon-button player-button"
        iconClassName="icon ion-ios-fastforward"
        onClick={onNextClick}
      />
    );
  }

  renderBackwardButton() {
    const { onPrevClick } = this.props;
    return (
      <IconButton
        title="Previous"
        btnClassName="icon-button player-button"
        iconClassName="icon ion-ios-rewind"
        onClick={onPrevClick}
      />
    );
  }

  render() {
    return (
      <div className="player-section">
        {this.renderBackwardButton()}
        {this.renderPlayPauseButton()}
        {this.renderForwardButton()}
      </div>
    );
  }
}

PlayerControls.propTypes = {
  playing: PropTypes.bool.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
};

export default PlayerControls;
