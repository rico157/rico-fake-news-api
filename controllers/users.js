const {
  users: { fetchUser },
} = require('../models');

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};
