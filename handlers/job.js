const { Company, Inst, Job, Message, Skill, User } = require("../models");
const Validator = require("jsonschema").Validator;
const v = new Validator();
const { createJobSchema } = require("../schemas");
const {
  ensureUserExists,
  ensureHandleExists,
  ensureCorrectCompany,
  asyncCompany
} = require("../helpers");
const jwt = require("jsonwebtoken");

exports.getAllJobs = (req, res, next) => {
  return Job.find().then(allJobs => {
    return res.json(allJobs);
  });
};

exports.createJob = (req, res, next) => {
  const jobValidation = v.validate(req.body, createJobSchema);
  if (!jobValidation.valid) {
    const errors = jobValidation.errors.map(e => e.stack).join(", ");
    return next({ message: errors });
  }

  const handleExists = ensureHandleExists.ensureHandleExists(
    req.headers.authorization
  );

  if (handleExists[0] !== true) {
    return next({ message: handleExists[1] });
  }
  return Job.create(req.body).then(job => {
    return Company.findOneAndUpdate(handleExists[1], {
      $addToSet: { jobs: job.id }
    }).then(company => {
      return Job.findByIdAndUpdate(job.id, {
        $addToSet: { company: company.id }
      }).then(() => {
        return res.redirect("/jobs");
      });
    });
  });
};

exports.newJobForm = (req, res, next) => {
  return res.json("New Jobs Form");
};

exports.editJobForm = (req, res, next) => {
  return Job.findById(req.params.job_id)
    .populate("Company")
    .then(job => {
      return res.json({ job });
    });
};

exports.getIndividualJob = (req, res, next) => {
  return Job.findById(req.params.job_id)
    .populate("Company")
    .then(job => {
      return res.json({ job });
    });
};

exports.editJob = async (req, res, next) => {
  let companyId = await asyncCompany.findCompanyId(req.params.jobId);
  let companyHandle = await asyncCompany.findCompanyHandle(companyId);
  const correctCompany = ensureCorrectCompany.ensureCorrectCompany(
    req.headers.authorization,
    companyHandle
  );
  if (correctCompany !== "OK") {
    return next({ message: correctCompany });
  }
  return Job.findByIdAndUpdate(req.params.jobId, req.body).then(() => {
    return res.redirect("/jobs");
  });
};

exports.deleteJob = async (req, res, next) => {
  let companyId = await asyncCompany.findCompanyId(req.params.jobId);
  let companyHandle = await asyncCompany.findCompanyHandle(companyId);

  const correctCompany = ensureCorrectCompany.ensureCorrectCompany(
    req.headers.authorization,
    companyHandle
  );

  if (correctCompany !== "OK") {
    return next(correctCompany);
  }
  return Job.findById(req.params.jobId)
    .then(job => {
      return job.remove();
    })
    .then(() => {
      return res.redirect("/jobs");
    });
};

exports.getApplicants = (req, res, next) => {
  return Job.findById(req.params.job_id)
    .populate("User")
    .then(job => {
      return res.json({ job });
    });
};

exports.applyForJob = (req, res, next) => {
  return Job.findById(req.params.job_id).then(job => {
    return res.json("hey apply job");
  });
};
