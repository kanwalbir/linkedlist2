const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User, Job, Company } = require('../models');

//postman works
router
  .get('/', (req, res, next) => {
    return User.find().then(users => {
      return res.json(users);
    });
  })

  //postman works
  .post('/', (req, res, next) => {
    console.log(req.body);
    return User.create(req.body).then(() => {
      return res.redirect('/users');
    });
  });

//postman works
router.get('/login', function(req, res, next) {
  // session.set(["id"]) = user_id
  return res.json('userLogin');
});

//postman works
router.get('/signup', function(req, res, next) {
  return res.json('userSignup');
});

//postman works
router
  .get('/:user_id', function(req, res, next) {
    return User.findById(req.params.user_id)
      .populate('Company', 'Inst', 'Skill')
      .then(user => {
        return res.json(user);
      });
  })

  //postman works
  .patch('/:user_id', function(req, res, next) {
    return User.findByIdAndUpdate(req.params.user_id, req.body).then(user => {
      return res.redirect(`/users/${user._id}`);
    });
  })

  //postman works
  .delete('/:user_id', function(req, res, next) {
    return User.findByIdAndRemove(req.params.user_id).then(() => {
      return res.redirect('/users/login');
    });
  });

//postman works
router.get('/:user_id/edit', function(req, res, next) {
  return User.findById(req.params.user_id)
    .populate('Company', 'Inst', 'Skill')
    .then(user => {
      return res.json(user);
    });
});

//postman works
router.get('/:user_id/messages', function(req, res, next) {
  return User.findById(req.params.user_id)
    .populate('Message')
    .then(user => {
      return res.json('userMessage', { user });
    });
});

//postman works
router.get('/:user_id/applications', function(req, res, next) {
  return User.findById(req.params.user_id)
    .populate('Job')
    .then(user => {
      return res.json('user/listOfApplications', { user });
    });
});

// DRAFT WILL FIX DURING AUTHENTICATION
router.patch('/:user_id/connect', function(req, res, next) {
  let connection = req.params.user_id;
  return User.findByIdUpdate(session.get(), {
    $addToSet: { connection: connection }
  }).then(() => {
    return res.redirect('/:user_id/show');
  });
});

module.exports = router;
