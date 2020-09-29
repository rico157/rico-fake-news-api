const usersRouter = require('express').Router();
const {
  users: { getUser }
} = require('../controllers');
const { invalidMethod } = require('../errors');

usersRouter.route('/:username').get(getUser).all(invalidMethod);

module.exports = usersRouter;
