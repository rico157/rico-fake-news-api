const ENV = process.env.NODE_ENV || 'development';
const {
  topicData,
  articleData,
  commentData,
  userData
} = require(`./${ENV}-data`);

const config = {
  development: {
    topicData,
    articleData,
    commentData,
    userData
  },
  test: {
    topicData,
    articleData,
    commentData,
    userData
  },
  production: {
    topicData,
    articleData,
    commentData,
    userData
  }
};

module.exports = { ...config[ENV] };
