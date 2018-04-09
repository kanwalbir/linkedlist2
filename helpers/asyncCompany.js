const { Job } = require('../models');

exports.findCompany = async function(sunny) {
  let foundCompany = await Job.findById(sunny)
    .populate('Company')
    .exec()
    .then(company => {
      return [company.id, company.handle];
    });
  // console.log('THIS IS THE COMPANY', foundCompany.company);
  // return [foundCompany.company, company.handle;
};
