import { createSelector } from 'reselect';

export const getAuthState = state => state.auth;

export const getSession = createSelector(getAuthState, state => state.session);

export const getMe = createSelector(getAuthState, state => state.me);

export const getMyId = createSelector(getMe, me => me && me.id);

export const isLoggedIn = createSelector(getSession, session => session);

export const getFavoriteTrackIds = createSelector(getAuthState, state => state.favoriteTracks);
