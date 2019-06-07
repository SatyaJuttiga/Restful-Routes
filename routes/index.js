var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Form = require('../models/form');


router.get('/', function (req, res) {
  res.render('login');
});

router.get('/register', function (req, res) {
  res.render('register');
});

router.post('/register', function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/landing');
    });
  });
});


router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/landing',
    failureredirect: '/login'
  }), function (req, res) {
  });

router.get('/landing', function (req, res) {
  res.render('landing');
});
/*
router.post('/landing', isLoggedin, function (req, res) {
  var name = req.body.name;
  var fatherName = req.body.fatherName;
  var email = req.body.email;
  var mobileNumber = req.body.mobileNumber;
  var address = req.body.address;

  var newForm = { name: name, fatherName: fatherName, email: email, mobileNumber: mobileNumber, address: address }
  //console.log(req.user);
  Form.create(newForm, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/show');
    }
  });
});
*/
router.post('/landing', isLoggedin, function (req, res) {
  console.log("adfasdfasdfasdf");
  Form.create(req.body.form, function (err, newForm) {
    console.log("data" + req);
    console.log(newForm);
    if (err) {
      res.render('landing');
    } else {
      res.redirect('/show');
    }
  });
});

router.get('/show', function (req, res) {
  Form.find({}, function (err, newForm) {
    if (err) {
      console.log(err);
    } else {
      console.log(newForm)
      res.render('show', { form: newForm, currentUser: req.user });
    }
  });
});

router.get('/show/:id/edit', function (req, res) {
  Form.findById(req.params.id, function (err, foundForm) {
    if (err) {
      res.redirect('/show');
    } else {
      res.render('edit', { form: foundForm });
    }
  });
});


router.put('/show/:id',function (req, res) {
  Form.findByIdAndUpdate(req.params.id, req.body.form, function (err, updatedForm) {
    if (err) {
      res.redirect('/show');
    } else {
      res.redirect('/show/' + req.params.id);
    }
  });
});

router.delete('/show/:id',function (req, res) {
  Form.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/show');
    } else {
      res.redirect('/recipes');
    }
  });
});


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/landing');
});

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
