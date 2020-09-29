const articlesRouter = require('express').Router();
const {
  articles: {
    getArticle,
    getArticles,
    patchArticle,
    deleteArticle,
    postArticle
  },
  comments: { getComments, postComments }
} = require('../controllers');
const { invalidMethod } = require('../errors');

articlesRouter.route('/').get(getArticles).post(postArticle).all(invalidMethod);

articlesRouter
  .route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .delete(deleteArticle)
  .all(invalidMethod);

articlesRouter
  .route('/:article_id/comments')
  .get(getComments)
  .post(postComments)
  .all(invalidMethod);

module.exports = articlesRouter;
