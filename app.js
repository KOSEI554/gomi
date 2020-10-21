const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const boards = require('./routes/boards');
const register = require('./routes/register'); 
const login = require('./routes/login');
const logout = require('./routes/logout');
const upload = require('./routes/upload');
const account = require('./routes/account');
const event = require('./routes/event');
const event_detail = require('./routes/event_detail');
const eventtop = require('./routes/eventtop');
const setting = require('./routes/setting');
const goal = require('./routes/goal');
const making = require('./routes/making');
const setUser = require('./routes/setUser');


const fileUpload = require('express-fileupload');

const app= express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'gomi',
  resave: false,
  saveUninitialized: true
}));
app.use(fileUpload());

const dir = path.join(__dirname, 'public');
app.use(express.static(dir));


app.use('/', setUser, indexRouter);
app.use('/users', usersRouter);
app.use('/boards', setUser, boards);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/upload', upload);
app.use('/account', account);
app.use('/event', event);
app.use('/event_detail', event_detail);
app.use('/eventtop', eventtop);
app.use('/setting', setting);
app.use('/goal', goal);
app.use('/making', making);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
