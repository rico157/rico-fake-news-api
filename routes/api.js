const apiRouter = require('express').Router();
const { getEnpoints } = require('../controllers');
const {
  topicsRouter,
  usersRouter,
  articlesRouter,
  commentsRouter
} = require('./');

apiRouter.route('/').get(getEnpoints);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
