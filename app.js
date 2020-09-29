const { getHomepage } = require('./controllers');
const { apiRouter } = require('./routes');
const cors = require('cors');
const express = require('express');
const err = require('./errors');
const app = express();

// Routes
app.use(cors());
app.use(express.json());
app.get('/', getHomepage);
app.use('/api', apiRouter);
app.get('/brew_coffee', err.handle418s);

// Errors
app.use(err.invalidPath);
app.use(err.customErrors);
app.use(err.handleDB);
app.use(err.handle400s);
app.use(err.handle404s);
app.use(err.handle405s);
app.use(err.handle422s);
app.use(err.handle500s);

module.exports = app;
