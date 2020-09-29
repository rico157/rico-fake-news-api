// Controllers
exports.invalidPath = (req, res, next) => {
  res.status(404).send({ msg: 'Path not found' });
};

exports.invalidMethod = (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed' });
};

exports.handle418s = (req, res, next) => {
  res.status(418).send({ msg: "I'm a teapot" });
};

// Custom Errors
exports.customErrors = (err, req, res, next) => {
  switch (err) {
    case 'Comments not found':
      res.status(404).send({ msg: err });
      break;
    case 'Username not found':
      res.status(404).send({ msg: err });
      break;
    case 'Article not found':
      res.status(404).send({ msg: err });
      break;
    case 'Articles not found':
      res.status(404).send({ msg: err });
      break;
    case 'Comment not found':
      res.status(404).send({ msg: err });
      break;
    case 'Nothing deleted':
      res.status(404).send({ msg: err });
      break;
    case 'Invalid order query':
      res.status(400).send({ msg: err });
      break;
    case 'Invalid body':
      res.status(400).send({ msg: err });
      break;
    default:
      next(err);
  }
};

// Error Handlers
exports.handleDB = (err, req, res, next) => {
  const errorString = err.toString();

  switch (err.code) {
    case '23503':
      if (errorString.endsWith('"comments_author_foreign"')) {
        res.status(404).send({ msg: 'Username not found' });
      } else if (errorString.endsWith('"articles_topic_foreign"')) {
        res.status(404).send({ msg: 'Topic not found' });
      } else if (errorString.endsWith('"articles_author_foreign"')) {
        res.status(404).send({ msg: 'Author not found' });
      } else {
        res.status(404).send({ msg: 'Article not found' });
      }
      break;
    case '22P02':
      if (errorString.endsWith('"NaN"')) {
        res.status(400).send({ msg: 'Invalid vote parameter' });
      } else {
        res.status(400).send({ msg: 'Invalid article id', err });
      }
      break;
    case '42703':
      res.status(400).send({ msg: 'Invalid sort_by option' });
      break;
    default:
      next(err);
  }
};

exports.handle400s = (err, req, res, next) => {
  // 400 Bad Request
  // get some from psql

  next(err);
};

exports.handle404s = (err, req, res, next) => {
  // 404 Not Found
  // get some from psql
  next(err);
};

exports.handle405s = (err, req, res, next) => {
  // 405 Method Not Allowed
  next(err);
};

exports.handle422s = (err, req, res, next) => {
  // 422 Unprocessable Entity
  next(err);
};

exports.handle500s = (err, req, res, next) => {
  // 500 Internal Server Error
  console.log(err, '500 : Server Error');
  res.status(500).send({ msg: 'Server is broken :(' });
};
