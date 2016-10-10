import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from 'client/components/Spinner';
import Track from 'client/models/Track';
import Artist from 'client/models/Artist';
import { formatPlaybacks, formatLikes, formatImageUrl } from 'client/utils/FormatUtils';
import { t500x500 } from 'client/constants/ImageConstants';

const TrackDetails = ({
  artist,
  track,
  isFetching,
  isLiked,
  handleLikeClick,
  handleUnlikeClick
}) => {
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="container">
      <div className="track-info-container">
        <div className="track-avatar">
          <img
            className="track-image"
            alt="Track Avatar"
            src={formatImageUrl(track.getArtworkUrl(), t500x500)}
          />
          <div className="image-details-bar">
            <span className="playback-count">
              <i className="fa fa-play" /> {formatPlaybacks(track.getPlaybackCount())}
            </span>
            <span className="likes-count">
              <i
                className={`fa fa-heart ${isLiked ? 'active' : ''}`}
                onClick={isLiked ? handleUnlikeClick : handleLikeClick}
              /> {formatLikes(track.getLikedCount())}
            </span>
          </div>
        </div>
        <div className="track-details">
          <h1 className="track-title">{ track.getTitle() }</h1>
          <div className="track-artist-name">
            Artist: <Link to={`/artist/${artist.getId()}`}>{ artist.getUsername() }</Link>
          </div>
          <div className="track-artist-name">Created At: {track.getCreatedAt().replace('+0000', '')}</div>
          <div className="track-description"><p>{track.getDescription()}</p></div>
          <div className="track-controls">
            <button className="button inline">
              <i className="fa fa-bookmark" /><span>ADD TO PLAYLIST</span>
            </button>
            <button className="button inline">
              <i className="fa fa-external-link" />
              <span>PERMALINK</span>
            </button>
            <button className="button inline">
              <i className="fa fa-clipboard" />
              <span>COPY TRACK LINK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TrackDetails.propTypes = {
  track: PropTypes.instanceOf(Track).isRequired,
  artist: PropTypes.instanceOf(Artist),
  isFetching: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool,
  handleLikeClick: PropTypes.func.isRequired,
  handleUnlikeClick: PropTypes.func.isRequired
};

export default TrackDetails;
