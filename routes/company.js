const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User, Job, Company } = require('../models');
//postman works
router.get('/login', function(req, res, next) {
  // session.set(["id"]) = company_id;
  return res.json('loginCompany');
});

//postman works
router.get('/signup', function(req, res, next) {
  return res.json('company signup');
});

//postman works
router
  .get('/', (req, res, next) => {
    return Company.find().then(companies => {
      return res.json(companies);
    });
  })
  //postman works
  .post('/', (req, res, next) => {
    console.log(req.body);
    return Company.create(req.body).then(() => {
      return res.redirect('/company');
    });
  });

//postman works
router
  .get('/:company_id', function(req, res, next) {
    return Company.findById(req.params.company_id)
      .populate('User', 'Job')
      .then(company => {
        return res.json(company);
      });
  })
  //postman works
  .patch('/:company_id', function(req, res, next) {
    return Company.findByIdAndUpdate(req.params.company_id, req.body).then(
      company => {
        console.log('WE MADE IT MAX!!!');
        return res.redirect(`/company/${company._id}`);
      }
    );
  })
  //postman works
  .delete('/:company_id', function(req, res, next) {
    return Company.findByIdAndRemove(req.params.company_id).then(company => {
      return res.redirect('/company/login');
    });
  });
//postman works
router.get('/:company_id/edit', function(req, res, next) {
  return Company.findById(req.params.company_id)
    .populate('User', 'Job')
    .then(company => {
      return res.json(company);
    });
});

router.get('/:company_id/show', function(req, res, next) {
  return Company.findById(req.params.company_id)
    .populate('User', 'Job')
    .then(company => {
      return res.json(company);
    });
});

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
