var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    logger = require('morgan'),
    sassMiddleware = require('node-sass-middleware'),
    passport = require('passport'),
    ldapStrategy = require('passport-ldapauth'),
    indexRouter = require('./routes'),
    usersRouter = require('./routes/users'),
    config = require('config'),
    passportMiddleware = require('./passport_middleware'),
    session = require('express-session'),
    uuid = require('uuid/v4'),
    app = express();

passport.use(new ldapStrategy({
  server: {
    url:              config.get('ldap.url'),
    bindDN:           config.get('ldap.bindDN'),
    bindCredentials:  config.get('ldap.bindCredentials'),
    searchBase:       config.get('ldap.searchBase'),
    searchFilter:     config.get('ldap.searchFilter')
  }
}));
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
passport.serializeUser(passportMiddleware.serializeUser);
passport.deserializeUser(passportMiddleware.deserializeUser);
app.use(passport.initialize());
app.use(passport.session());
var mongoose = require('mongoose');
// by default, there is an admin account with no password protection and
// if you happened to have created account and password for mongoDB, remember
// to provide authentication information here too
mongoose.connect('mongodb://localhost:27017/service-media', function (err) {
// 27017 is the default port for mongodb and if you change your db port, change here also
  if (err) { // error handler for db connection
    return console.log('Cannot connect to database', err);
  }
  // of course your can have a better db connection error handler
  return console.log('Database connected.');
});
var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
