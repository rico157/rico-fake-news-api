const knex = require('../db/connection');

exports.selectComments = (article_id, sort_by = 'created_at', order) => {
  let order_by = order || 'desc';
  if (order_by === 'asc') {
    order_by = 'asc';
  } else {
    order_by = 'desc';
  }

  return knex
    .select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where({ article_id })
    .orderBy(sort_by, order_by)
    .then((comments) => {
      if (comments.length === 0) return Promise.reject('Article not found');
      return comments;
    });
};

exports.insertComment = (author, article_id, body) => {
  if (!author || !body) return Promise.reject('Invalid body');
  return knex('comments')
    .insert({ author, article_id, body })
    .returning('*')
    .then((comments) => {
      return comments[0];
    });
};

exports.updateComment = (comment_id, votes = 0) => {
  return knex('comments')
    .where({ comment_id })
    .increment({ votes })
    .returning('*')
    .then(() => {
      return knex
        .select()
        .from('comments')
        .where({ comment_id })
        .then((comments) => {
          if (comments.length === 0) return Promise.reject('Comment not found');
          return comments[0];
        });
    });
};

exports.removeComment = (comment_id) => {
  return knex('comments')
    .delete()
    .where({ comment_id })
    .then((count) => {
      if (count === 0) return Promise.reject('Nothing deleted');
    });
};
