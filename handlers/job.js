const { Company, Inst, Job, Message, Skill, User } = require('../models');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const { createJobSchema } = require('../schemas');

exports.getAllJobs = (req, res, next) => {
  return Job.find().then(allJobs => {
    return res.json(allJobs);
  });
};

exports.createJob = (req, res, next) => {
  const jobValidation = v.validate(req.body, createJobSchema);
  if (!jobValidation.valid) {
    const errors = jobValidation.errors.map(e => e.stack).join(',');
    return next({ message: errors });
  }
  return Job.create(req.body).then(() => {
    return res.redirect('/jobs');
  });
};

exports.newJobForm = (req, res, next) => {
  return res.json('New Jobs it works');
};

exports.editJobForm = (req, res, next) => {
  return Job.findById(req.params.job_id)
    .populate('Company')
    .then(job => {
      return res.json({ job });
    });
};

exports.getIndividualJob = (req, res, next) => {
  return Job.findById(req.params.job_id)
    .populate('Company')
    .then(job => {
      return res.json({ job });
    });
};

exports.editJob = (req, res, next) => {
  return Job.findByIdAndUpdate(req.params.job_id, req.body).then(() => {
    return res.json('/:job_id');
  });
};

exports.deleteJob = (req, res, next) => {
  return Job.findByIdAndRemove(req.params.job_id).then(() => {
    return res.redirect('/jobs');
  });
};

exports.getApplicants = (req, res, next) => {
  return Job.findById(req.params.job_id)
    .populate('User')
    .then(job => {
      return res.json({ job });
    });
};

exports.applyForJob = (req, res, next) => {
  return Job.findById(req.params.job_id).then(job => {
    return res.json('hey apply job');
  });
};
