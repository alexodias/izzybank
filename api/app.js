const express = require('express');
const cors = require('cors');
const accountRoutes = require('../routes/accountRoutes');
const accountMiddleware = require('../middlewares/accountMiddlewares');
const transactionRoutes = require('../routes/transactionRoutes');
const transactionMiddlewares = require('../middlewares/transactionMiddlewares');
const transactionComplementMiddleware = require('../middlewares/transactionComplementMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(accountRoutes);
app.use(accountMiddleware);

app.use(transactionRoutes);
app.use(transactionMiddlewares);
app.use(transactionComplementMiddleware);

module.exports = app;
