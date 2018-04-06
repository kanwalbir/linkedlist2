const { Company, Inst, Job, Message, Skill, User } = require('../models');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const { createUserSchema } = require('../schemas');

exports.userLogin = (req, res, next) => {
  // session.set(["id"]) = user_id
  return res.json('userLogin');
};

exports.userSignup = (req, res, next) => {
  return res.json('userSignup');
};

exports.showAllUsers = (req, res, next) => {
  return User.find().then(users => {
    return res.json(users);
  });
};

exports.createNewUser = (req, res, next) => {
  const userValidation = v.validate(req.body, createUserSchema);
  if (!userValidation.valid) {
    const errors = userValidation.errors.map(e => e.stack).join(', ');
    return next({ message: errors });
  }
  return User.create(req.body).then(() => {
    return res.redirect('/users');
  });
};

exports.displayUser = (req, res, next) => {
  return User.findById(req.params.user_id)
    .populate('Company', 'Inst', 'Skill')
    .then(user => {
      return res.json(user);
    });
};

exports.updateUser = (req, res, next) => {
  return User.findByIdAndUpdate(req.params.user_id, req.body).then(user => {
    return res.redirect(`/users/${user._id}`);
  });
};

exports.deleteUser = (req, res, next) => {
  return User.findByIdAndRemove(req.params.user_id).then(() => {
    return res.redirect('/users/login');
  });
};

exports.renderUserEditPage = (req, res, next) => {
  return User.findById(req.params.user_id)
    .populate('Company', 'Inst', 'Skill')
    .then(user => {
      return res.json(user);
    });
};

exports.userMessages = (req, res, next) => {
  return User.findById(req.params.user_id)
    .populate('Message')
    .then(user => {
      return res.json('userMessage', { user });
    });
};

exports.userApplications = (req, res, next) => {
  return User.findById(req.params.user_id)
    .populate('Job')
    .then(user => {
      return res.json('user/listOfApplications', { user });
    });
};

exports.userConnections = (req, res, next) => {
  let connection = req.params.user_id;
  return User.findByIdUpdate(session.get(), {
    $addToSet: { connection: connection }
  }).then(() => {
    return res.redirect('/:user_id/show');
  });
};
