const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const { companyHandlers } = require('../handlers');

router.get('/login', companyLogin);

router.get('/signup', companySignUp);

router.get('/', showAllCompanies).post('/', createCompany);

router
  .get('/:company_id', showCompanyFeed)
  .patch('/:company_id', editCompany)
  .delete('/:company_id', deleteCompany);

router.get('/:company_id/edit', renderEditPage);

router.get('/:company_id/show', showCompanyProfile);

// router.get('/:company_id/jobs',function(req,res,next){
//   return Company.findById(req.params.company_id).populate('Job').then(company =>{
//       return res.json('company/jobs,', {company})
//   })
// })
// .post('/company_id/jobs', function(req,res,next){
//   return Job.create(req.body).then(() => {
//     return res.redirect('/:company_id/jobs')
//   })
// })

module.exports = router;
