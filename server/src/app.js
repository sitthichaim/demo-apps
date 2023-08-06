const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDefault = require('./swagger.json');
const swaggerProduction = require('./swagger-production.json');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

const getSwaggerDocument = () => {
  return process.env.NODE_ENV === 'production' ? swaggerProduction : swaggerDefault;
};

app.use('/api/v1', api);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(getSwaggerDocument()));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
