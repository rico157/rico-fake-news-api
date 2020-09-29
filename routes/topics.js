const topicsRouter = require('express').Router();
const {
  topic: { getTopics }
} = require('../controllers');
const { invalidMethod } = require('../errors');

topicsRouter.route('/').get(getTopics).post().all(invalidMethod);

module.exports = topicsRouter;
