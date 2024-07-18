var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statecityrouter = require('./routes/statecity');
var restaurantrouter = require('./routes/restaurant')
var catagoryrouter = require('./routes/catagory')
var subcatagoryrouter = require('./routes/subcatagory')
var tablebookingrouter = require('./routes/tablebooking')
var waiterrouter = require('./routes/waiter')
var superAdminRouter=require('./routes/superadmin')
var waitertablerouter=require('./routes/waitertable')
var adminrouter=require('./routes/admin')
const billingRouter=require('./routes/billing')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statecity', statecityrouter);
app.use('/restaurants', restaurantrouter);
app.use('/catagory', catagoryrouter);
app.use('/subcatagory', subcatagoryrouter)
app.use('/tablebooking', tablebookingrouter)
app.use('/waiters', waiterrouter)
app.use('/superadmin',superAdminRouter );
app.use('/waitertable',waitertablerouter);
app.use('/admin',adminrouter);
app.use('/billing',billingRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
