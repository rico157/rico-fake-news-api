const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');
const {
  formatDates,
  makeArticleRef,
  makeIdComments
} = require('../utils/data-manipulation.js');

exports.seed = function (knex) {
  return knex.migrate.rollback().then(() =>
    knex.migrate
      .latest()
      .then(() => {
        return knex.insert(userData).into('users');
      })
      .then(() => {
        return knex.insert(topicData).into('topics');
      })
      .then(() => {
        const formattedArticles = formatDates(articleData);
        return knex.insert(formattedArticles).into('articles').returning('*');
      })
      .then((articles) => {
        const articlesRef = makeArticleRef(articles);
        const formattedComments = formatDates(commentData);
        const reformattedComments = makeIdComments(
          articlesRef,
          formattedComments
        );
        return knex.insert(reformattedComments).into('comments');
      })
  );
};
