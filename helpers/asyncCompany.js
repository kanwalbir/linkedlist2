const { Job } = require('../models');

// exports.findCompany = async function(jobId) {
//   return await Job.findById(jobId)
//     .populate('Company')
//     .exec()
//     .then(company => {
//       console.log('inside async', company);
//       console.log('inside async', company.handle);
//       return company.handle;
//     });
// };

exports.findCompany = function(jobId) {
  return await Job.findById(jobId)
    .populate('Company')
    .exec()
    .then(company => {
      console.log('inside async', company);
      console.log('inside async', company.handle);
      return company.handle;
    });
};
