const { Job, Company } = require("../models");

exports.findCompanyId = async function(jobId) {
  return await Job.findById(jobId).then(job => job.company);
};

exports.findCompanyHandle = async function(companyId) {
  return await Company.findById(companyId).then(company => company.handle);
};
