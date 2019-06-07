var express = require('express');
  bodyparser = require('body-parser'),
  methodOverirde = require('method-override'),
  mongoose = require('mongoose'),
  expressSession = require('express-session'),
  //flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local');
  User = require('./models/user'),
  //Recipe = require('./models/recipe'),
  //Comment = require('./models/comment');
 
mongoose.connect('mongodb://localhost/valuepitch');

var app = express();



const port = process.env.PORT || 8080;

var indexRoutes = require('./routes/index');





app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverirde('_method'));
//app.use(flash());



app.use(require('express-session')({
  secret: 'bhavna',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.User;
  //res.locals.message = req.flash('error');
  next();
});



app.use(indexRoutes);

app.listen(port, () => {
  console.log('server started on port' + port);
});

