const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const { companyHandlers } = require('../handlers');

router.get('/login', companyHandlers.companyLogin);

router.get('/signup', companyHandlers.companySignUp);

router
  .get('/', companyHandlers.showAllCompanies)
  .post('/', companyHandlers.createCompany);

router
  .get('/:company_id', companyHandlers.showCompanyFeed)
  .patch('/:company_id', companyHandlers.editCompany)
  .delete('/:company_id', companyHandlers.deleteCompany);

router.get('/:company_id/edit', companyHandlers.renderEditPage);

router.get('/:company_id/show', companyHandlers.showCompanyProfile);

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
