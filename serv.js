#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('./app');
var express = require('express');
var app = express();
require('dotenv').config();
var cors = require('cors');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var classesRoutes = require('./routes/classes');
var port = process.env.PORT || 9000;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/classes', classesRoutes);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Appy listening at http://localhost:${port}`);
});