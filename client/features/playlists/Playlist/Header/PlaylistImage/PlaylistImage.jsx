import React from 'react';
import styled from 'styled-components';
import TrackImage from 'common/components/images/TrackImage';
import { connect } from 'react-redux';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import { playPlaylist } from 'features/playlists/playlistsActions';
import { isPlayerLoading, isPlayerPlaying } from 'features/player/playerSelectors';
import { getActivePlayQueueName } from 'features/playQueue/playQueueSelectors';

const Wrapper = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

function formatImages(images) {
  let imageGroup = images;
  if (images.length === 1) {
    imageGroup = [images[0], images[0], images[0], images[0]];
  } else if (images.length === 2) {
    imageGroup = [images[0], images[1], images[1], images[0]];
  } else if (images.length === 3) {
    imageGroup = [...images, images[0]];
  }
  return imageGroup;
}

function PlaylistImage({
  images,
  playlistId,
  handleImageClick,
  loading,
  playing,
  activePlayQueueName,
}) {
  const imageGroup = formatImages(images);
  const playlistActive = activePlayQueueName === `playlist-${playlistId}`;
  return (
    <Wrapper
      onClick={() => {
        handleImageClick(playlistId);
      }}
    >
      <Row>
        <TrackImage src={imageGroup[0]} />
        <TrackImage src={imageGroup[1]} />
      </Row>
      <Row>
        <TrackImage src={imageGroup[2]} />
        <TrackImage src={imageGroup[3]} />
      </Row>
      <PlaybackOverlay
        active={playlistActive}
        onClick={() => {
          console.log('Play current playlist');
        }}
        loading={loading}
        playing={playing}
      />
    </Wrapper>
  );
}

const actions = {
  handleImageClick: playPlaylist,
};

function mapStateToProps(state) {
  return {
    activePlayQueueName: getActivePlayQueueName(state), // if current playlist is being played
    loading: isPlayerLoading(state),
    playing: isPlayerPlaying(state),
  };
}

export default connect(mapStateToProps, actions)(PlaylistImage);
