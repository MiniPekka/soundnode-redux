import React from 'react';
import PropTypes from 'prop-types';
import UserProfileTracks from 'client/features/userProfile/UserProfileTracks';
import UserProfileDetails from 'client/features/userProfile/UserProfileDetails';

const UserProfilePage = ({ userId, trackCount }) => (
  <div className="container-fluid">
    <UserProfileDetails userId={userId} />
    <h3>Tracks ({trackCount}) :</h3>
    <UserProfileTracks />
  </div>
);

UserProfilePage.propTypes = {
  userId: PropTypes.number,
  trackCount: PropTypes.string,
};

UserProfilePage.defaultProps = {
  userId: null,
  trackCount: '0',
};

export default UserProfilePage;