var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var async = require("async");

var db = require('./models/db')

//  --数据库连接池的运用(减少连接数量,只有一个实例保存)
/*var MongoClient = require('mongodb').MongoClient;
var db;
async.auto({
    connectDB: function (callback) {
        MongoClient.connect("mongodb://localhost:27017/liangwei", function(err, database) {
            if(err) throw err;
            db = database;
            console.log("数据库已连接");
            callback(null,db)
        });
    },
    exportDB: ['connectDB', function(callback) {
        module.exports = db
        console.log(db);
    }]
}, function(err, results) {
    console.log(results);
});*/
db.connect('mongodb://localhost:27017/liangwei', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        app.listen(27017, function() {
            console.log('>>Listening on port database...')
        })
    }
})
//  --数据库连接池的运用

var index = require('./routes/index');
var userInfo = require('./routes/API/userInfo/userInfo')
var emailStyle = require('./routes/API/emailStyle/emailStyle');
var alarmMail = require('./routes/API/Nodemailer/alarmMail');
var regMail = require('./routes/API/Nodemailer/RegMail');
var workText = require('./routes/API/workText/workText');
var Login = require('./routes/API/Login/Login');
var radioactive = require('./routes/API/Radioactive/radioactive');
var transportTask = require('./routes/API/TransportTask/transportTask');
var car = require('./routes/API/carInfo/car');
var userUpload = require('./routes/API/upload/userUpload');
var welcome = require('./routes/API/welcome/welcome');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/welcome',welcome)
app.use('/userUpload',userUpload)
app.use('/car',car);
app.use('/transportTask',transportTask);
app.use('/radioactive',radioactive);
app.use('/Login',Login);
app.use('/workText',workText);
app.use('/regMail',regMail);
app.use('/alarmMail',alarmMail);
app.use('/userInfo',userInfo);
app.use('/emailStyle',emailStyle);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
