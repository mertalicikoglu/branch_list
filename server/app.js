import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
const cors = require('cors')
import logger from 'morgan';

import branches from './routes/branches';
import usersRouter from './routes/users';
import authentication  from './routes/authenticaiton';

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

app.use(authentication);
app.use('/api/branches', branches);
app.use('/users', usersRouter);


export default app;
