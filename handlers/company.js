const { Company, Inst, Job, Message, Skill, User } = require('../models');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const jwt = require('jsonwebtoken');
const { createCompanySchema } = require('../schemas');
const { ensureCorrectCompany } = require('../helpers');

exports.companyLogin = (req, res, next) => {
  return res.json('loginCompany');
};

exports.companySignUp = (req, res, next) => {
  return res.json('company signup');
};

exports.companyAuthentication = (req, res, next) => {
  return Company.findOne({ handle: req.body.handle }).then(
    company => {
      if (!company) {
        return res.status(401).json({ message: 'Invalid Company you mofo!' });
      }
      return company.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          console.log('secretkey:', process.env.SECRET_KEY);
          const token = jwt.sign(
            { company: company.handle },
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

exports.showAllCompanies = (req, res, next) => {
  return Company.find().then(companies => {
    return res.json(companies);
  });
};

exports.createCompany = (req, res, next) => {
  const companyValidation = v.validate(req.body, createCompanySchema);
  if (!companyValidation.valid) {
    const errors = companyValidation.errors.map(e => e.stack).join(', ');
    return next({ message: errors });
  }
  return Company.create(req.body).then(() => {
    return res.redirect('/company');
  });
};

exports.showCompanyFeed = (req, res, next) => {
  return Company.findById(req.params.company_id)
    .populate('User', 'Job')
    .then(company => {
      return res.json(company);
    });
};

exports.editCompany = (req, res, next) => {
  let correctCompany = ensureCorrectCompany.ensureCorrectCompany(
    req.headers.authorization,
    req.params.handle
  );
  if (correctUser !== 'OK') {
    return next(correctUser);
  }
  return Company.findOneAndUpdate({ handle: req.params.handle }, req.body).then(
    company => {
      return res.redirect(`/company/${company.handle}`);
    }
  );
};

// exports.deleteCompany = (req, res, next) => {
//   return Company.findByIdAndRemove(req.params.company_id).then(company => {
//     return res.redirect('/company/login');
//   });
// };

exports.deleteCompany = (req, res, next) => {
  let correctCompany = ensureCorrectCompany.ensureCorrectCompany(
    req.headers.authorization,
    req.params.handle
  );
  if (correctCompany !== 'OK') {
    return next(correctCompany);
  }
  return Company.findOneAndRemove({ handle: req.params.handle }).then(() => {
    return res.redirect('/company/login');
  });
};

exports.renderEditPage = (req, res, next) => {
  return Company.findById(req.params.company_id)
    .populate('User', 'Job')
    .then(company => {
      return res.json(company);
    });
};

exports.showCompanyProfile = (req, res, next) => {
  return Company.findById(req.params.company_id)
    .populate('User', 'Job')
    .then(company => {
      return res.json(company);
    });
};
