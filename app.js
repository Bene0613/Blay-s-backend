const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/v1/users');
const apiBagsRouter = require('./routes/api/v1/bags');
const session = require('express-session');


const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/blays");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected to:", mongoose.connection.db.databaseName);
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "layssecretkey",
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/bags', apiBagsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// error handler (API + HTML)
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  // If the request is for the API, return JSON
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Server error"
    });
  }

  // Otherwise return HTML for browser routes
  res.status(err.status || 500);
  res.render('error', { 
    message: err.message, 
    error: req.app.get('env') === 'development' ? err : {} 
  });
});

module.exports = app;
