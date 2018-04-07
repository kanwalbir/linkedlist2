const express = require("express");
const router = express.Router();
const { companyHandlers } = require("../handlers");

router.route("/login").get(companyHandlers.companyLogin);

router.route("/signup").get(companyHandlers.companySignUp);

router
  .route("/")
  .get(companyHandlers.showAllCompanies)
  .post(companyHandlers.createCompany);

router
  .route("/:company_id")
  .get(companyHandlers.showCompanyFeed)
  .patch(companyHandlers.editCompany)
  .delete(companyHandlers.deleteCompany);

router.route("/:company_id/edit").get(companyHandlers.renderEditPage);

router.route("/:company_id/show").get(companyHandlers.showCompanyProfile);

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
