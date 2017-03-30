export const CLIENT_ID = 'f9e1e2232182a46705c880554a1011af'; // Sound Cloud ClientID

const HOST_DEV = 'http://localhost:3000';
const HOST_PROD = 'https://redux-music.herokuapp.com';

// #TODO: change to dev
const API_HOST_DEV = 'https://redux-music-api.herokuapp.com'; // Will go through proxy and go to 3001, see config in webpack

const API_HOST_PROD = 'https://redux-music-api.herokuapp.com';

// PRODUCTION is from DefinePlugin in webpack
export const API_HOST = PRODUCTION ? API_HOST_PROD : API_HOST_DEV;

export const HOST = PRODUCTION ? HOST_PROD : HOST_DEV ;
