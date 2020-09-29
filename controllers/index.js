const path = require('path');

exports.topic = require('./topic');
exports.users = require('./users');
exports.articles = require('./articles');
exports.comments = require('./comments');

exports.getEnpoints = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'endpoints.json'));
};

exports.getHomepage = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
};
