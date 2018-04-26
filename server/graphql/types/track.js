const axios = require('axios');
const {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList,
} = require('graphql');
const CommentType = require('./comment');
const UserType = require('./user');
const { BASE_V1, CLIENT_ID } = require('../consts');

const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
    user_id: {
      type: GraphQLInt,
    },
    user: {
      type: UserType,

      resolve(parentValue) {
        console.log(parentValue.user_id);
        return axios
          .get(`${BASE_V1}/users/${parentValue.user_id}?client_id=${CLIENT_ID}`)
          .then(res => res.data);
      },
    },
    title: {
      type: GraphQLString,
    },
    permalink_url: {
      type: GraphQLString,
    },
    purchase_url: {
      type: GraphQLString,
    },
    artwork_url: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    duration: {
      type: GraphQLInt,
    },
    genre: {
      type: GraphQLString,
    },
    stream_url: {
      type: GraphQLString,
    },
    comments: {
      type: new GraphQLList(CommentType),

      resolve(parentValue) {
        return axios
          .get(`${BASE_V1}/tracks/${parentValue.id}/comments?client_id=${CLIENT_ID}`)
          .then(resp => resp.data);
      },
    },
  }),
});

module.exports = TrackType;
