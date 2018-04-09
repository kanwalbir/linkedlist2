const { Company, Inst, Job, Message, Skill, User } = require('../models');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const { createJobSchema } = require('../schemas');
const {
  ensureUserExists,
  ensureHandleExists,
  ensureCorrectCompany,
  asyncCompany
} = require('../helpers');
const jwt = require('jsonwebtoken');

exports.getAllJobs = (req, res, next) => {
  return Job.find().then(allJobs => {
    return res.json(allJobs);
  });
};

exports.createJob = (req, res, next) => {
  console.log('WTF ', req.headers.authorization);
  const handleExists = ensureHandleExists.ensureHandleExists(
    req.headers.authorization
  );
  // const jobValidation = v.validate(req.body, createJobSchema);
  // if (!jobValidation.valid) {
  //   const errors = jobValidation.errors.map(e => e.stack).join(',');
  //   return next({ message: errors });
  // }
  if (handleExists[0] !== true) {
    return next(handleExists);
  }
  return Job.create(req.body).then(job => {
    return Company.findOneAndUpdate(handleExists[1], {
      $addToSet: { jobs: job.id }
    }).then(company => {
      return Job.findByIdAndUpdate(job.id, {
        $addToSet: { company: company.id }
      }).then(() => {
        return res.json('hello sunny');
      });
    });
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
  let sunny = req.params.jobId;
  console.log(req.params);
  let mark = asyncCompany.findCompany(sunny);

  console.log(mark);
  const correctCompany = ensureCorrectCompany.ensureCorrectCompany(
    req.headers.authorization,
    mark[1]
  );
  if (correctCompany !== 'OK') {
    console.log('SOMETHING IS FUCKED');
    return next(correctCompany);
  }
  console.log('ENTERING REMOVE');
  return Job.findById(req.params.jobId)
    .then(job => {
      return job.remove();
    })
    .then(() => {
      return res.redirect('/');
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
