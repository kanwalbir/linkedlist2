const { Company, Inst, Job, Message, Skill, User } = require('../models');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const jwt = require('jsonwebtoken');
const { createUserSchema } = require('../schemas');
const { ensureCorrectUser } = require('../helpers');

exports.userLogin = (req, res, next) => {
  return res.json('userLogin');
};

exports.userSignup = (req, res, next) => {
  return res.json('userSignup');
};

exports.userAuthentication = (req, res, next) => {
  return User.findOne({ username: req.body.username }).then(
    user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid Username' });
      }
      return user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { username: user.username },
            process.env.SECRET_KEY,
            {
              expiresIn: 60 * 60
            }
          );
          return res.json({ message: 'Authenticated!', token });
        } else {
          return res.status(401).json({ message: 'Invalid Password' });
        }
      });
    },
    err => next(err)
  );
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

exports.updateUser = function(req, res, next) {
  let correctUser = ensureCorrectUser.ensureCorrectUser(
    req.headers.authorization,
    req.params.username
  );
  if (correctUser !== 'OK') {
    return next(correctUser);
  }
  return User.findOneAndUpdate(
    { username: req.params.username },
    req.body
  ).then(user => {
    return res.redirect(`/users/${user.username}`);
  });
};

exports.deleteUser = (req, res, next) => {
  let correctUser = ensureCorrectUser.ensureCorrectUser(
    req.headers.authorization,
    req.params.username
  );
  if (correctUser !== 'OK') {
    return next(correctUser);
  }
  return User.findOneAndRemove({ username: req.params.username }).then(() => {
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
