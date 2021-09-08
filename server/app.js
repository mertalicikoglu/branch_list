import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
const cors = require('cors')
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app = express();
const { models, sequelize } = require('./db/index')

app.set('db', models)
app.set('sequelize', sequelize)
app.set('case sensitive routing', true)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
