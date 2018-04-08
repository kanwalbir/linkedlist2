const express = require('express');
const router = express.Router();
const { companyHandlers } = require('../handlers');
const { authorizeToken } = require('../helpers');

router
  .route('/login')
  .get(companyHandlers.companyLogin)
  .post(companyHandlers.companyAuthentication);

router.route('/signup').get(companyHandlers.companySignUp);

router
  .route('/')
  .get(companyHandlers.showAllCompanies)
  .post(companyHandlers.createCompany);

router
  .route('/:handle')
  .get(authorizeToken.authorizeToken, companyHandlers.showCompanyFeed)
  .patch(authorizeToken.authorizeToken, companyHandlers.editCompany)
  .delete(authorizeToken.authorizeToken, companyHandlers.deleteCompany);

router
  .route('/:handle/edit')
  .get(authorizeToken.authorizeToken, companyHandlers.renderEditPage);

router
  .route('/:handle/show')
  .get(authorizeToken.authorizeToken, companyHandlers.showCompanyProfile);

// router.get('/:handle/jobs',function(req,res,next){
//   return Company.findById(req.params.handle).populate('Job').then(company =>{
//       return res.json('company/jobs,', {company})
//   })
// })
// .post('/handle/jobs', function(req,res,next){
//   return Job.create(req.body).then(() => {
//     return res.redirect('/:company_id/jobs')
//   })
// })

module.exports = router;
