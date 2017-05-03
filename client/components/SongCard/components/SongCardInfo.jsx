import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'client/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'client/constants/RouteConsts';

function SongCardInfo({ trackId, userId, userAvatar, title, username }) {
  const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;
  return (
    <div className="song-card-info-wrapper">
      <Avatar src={userAvatar} />
      <div className="song-card-details">
        <Link to={trackUrl} className="song-card-title" title={title}>
          {title}
        </Link>
        <Link to={userUrl} className="song-card-username" title={username}>
          {username}
        </Link>
      </div>
    </div>
  );
}

SongCardInfo.defaultProps = {
  trackId: 0,
  userId: null,
  userAvatar: '',
  title: '',
  username: '',
};

SongCardInfo.propTypes = {
  trackId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  userAvatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default SongCardInfo;
