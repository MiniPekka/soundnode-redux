import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { defaultArtistImageUrl } from 'client/constants/ImageConstants';

const SongCardInfo = ({
    trackId,
  artistId,
  artistAvatar,
  title,
  artistName,
}) => (
  <div className="song-card-user clearfix">
    <img
      alt="user-profile-img"
      className="song-card-user-image"
      src={artistAvatar || defaultArtistImageUrl}
    />
    <div className="song-card-details">
      <Link to={`/track/${trackId}`} className="song-card-title">
        {title}
      </Link>
      <Link to={`/artist/${artistId}`} className="song-card-username">
        {artistName}
      </Link>
    </div>
  </div>
);

SongCardInfo.propTypes = {
  trackId: PropTypes.number,
  artistId: PropTypes.number,
  artistAvatar: PropTypes.string,
  title: PropTypes.string,
  artistName: PropTypes.string,
};

export default SongCardInfo;
