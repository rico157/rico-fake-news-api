const knex = require('../db/connection');

exports.fetchUser = (username) => {
  return knex
    .select()
    .from('users')
    .where({ username })
    .then((user) => {
      if (user.length === 0) return Promise.reject('Username not found');
      return user[0];
    });
};
