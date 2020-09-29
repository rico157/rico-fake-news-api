const { articles } = require('.');
const knex = require('../db/connection');

const selectArticle = (article_id) => {
  return knex
    .select(
      'articles.author',
      'title',
      'articles.article_id',
      'articles.body',
      'topic',
      'articles.created_at',
      'articles.votes'
    )
    .count('comments AS comment_count')
    .from('articles')
    .join('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .where('articles.article_id', article_id)
    .then((article) => {
      if (article.length === 0) return Promise.reject('Article not found');
      return article[0];
    });
};

const updateArticle = (votes = 0, article_id) => {
  return knex('articles')
    .where({ article_id })
    .increment({ votes })
    .returning('*')
    .then(() => {
      return selectArticle(article_id);
    });
};

const selectArticles = (
  sort_by = 'articles.created_at',
  order,
  author,
  topic
) => {
  // invalid order
  order === 'asc' ? (order = 'asc') : (order = 'desc');
  // if not asc or desc --> reject

  const selection = knex
    .select(
      'articles.author',
      'title',
      'articles.article_id',
      'topic',
      'articles.created_at',
      'articles.votes',
      'comment_count'
    )
    .count('comments AS comment_count')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .modify((query) => {
      if (author) query.where('articles.author', author);
      if (topic) query.where({ topic });
    });

  return selection.then((articles) => {
    if (articles.length === 0) return Promise.reject('Articles not found');
    else return articles;
  });
};

const removeArticle = (article_id) => {
  return knex('articles')
    .delete()
    .where({ article_id })
    .then((count) => {
      if (count === 0) return Promise.reject('Nothing deleted');
    });
};

const insertArticle = (author, body, title, topic) => {
  if (!author || !body || !title || !topic)
    return Promise.reject('Invalid body');
  return knex('articles')
    .insert({ author, body, title, topic })
    .returning('*')
    .then((articles) => {
      return articles[0];
    });
};
module.exports = {
  selectArticle,
  selectArticles,
  updateArticle,
  insertArticle,
  removeArticle
};
