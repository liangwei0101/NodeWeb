var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var MongoStore = require('connect-mongo');
//采用connect-mongodb中间件作为Session存储
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var crypto = require('crypto')
var settings = require('./Settings');

var index = require('./routes/index');
var login = require('./routes/login');
var api = require('./routes/api');
var deleteWorkText = require('./routes/API/workText/deleteWorkText');
var deleteUser = require('./routes/API/userInfo/deleteUser');
var freezeUser =  require('./routes/API/userInfo/freezeUser');
var emailStyle = require('./routes/API/emailStyle/emailStyle');
var alarmMail = require('./routes/API/Nodemailer/alarmMail');
var regMail = require('./routes/API/Nodemailer/RegMail');
var workText = require('./routes/API/workText/workText');
var Login = require('./routes/API/Login/Login');
//var users = require('./routes/users')

var app = express();

// view engine setup
/*app.engine('html', require('ejs').__express);
app.set('view engine', 'html');*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 1},//30 days
    store: new MongoStore({
      /*    db: settings.db,
       host: settings.host,
       port: settings.port,*/
        url:'mongodb://localhost/' + settings.db,
        autoRemove:'native'
    })
}));

app.use('/Login',Login);
app.use('/deleteWorkText',deleteWorkText)
app.use('/workText',workText);
app.use('/regMail',regMail);
app.use('/alarmMail',alarmMail);
app.use('/freezeUser',freezeUser);
app.use('/deleteUser',deleteUser)
app.use('/emailStyle',emailStyle);
app.use('/api',api);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log(req)
  err.status = 404;
  next(err);
});

/*// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.getOne('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
