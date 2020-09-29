const commentsRouter = require('express').Router();
const {
  comments: { patchComments, deleteComment }
} = require('../controllers');
const { invalidMethod } = require('../errors');

commentsRouter
  .route('/:comment_id')
  .patch(patchComments)
  .delete(deleteComment)
  .all(invalidMethod);

module.exports = commentsRouter;
