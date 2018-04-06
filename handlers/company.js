const { Company, Inst, Job, Message, Skill, User } = require('../models');

exports.companyLogin = (req, res, next) => {
  return res.json('loginCompany');
};

exports.companySignUp = (req, res, next) => {
  return res.json('company signup');
};

exports.showAllCompanies = (req, res, next) => {
  return Company.find().then(companies => {
    return res.json(companies);
  });
};

exports.createCompany = (req, res, next) => {
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
  return Company.findByIdAndUpdate(req.params.company_id, req.body).then(
    company => {
      console.log('WE MADE IT MAX!!!');
      return res.redirect(`/company/${company._id}`);
    }
  );
};

exports.deleteCompany = (req, res, next) => {
  return Company.findByIdAndRemove(req.params.company_id).then(company => {
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
