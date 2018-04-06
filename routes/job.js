const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const { jobHandlers } = require('../handlers');

const { User, Job, Company } = require('../models');

// POSTMAN WORKS
router
  .get('/', function(req, res, next) {
    return Job.find().then(allJobs => {
      return res.json(allJobs);
    });
  })

  //POSTMAN WORKS
  .post('/', (req, res, next) => {
    return Job.create(req.body).then(() => {
      return res.redirect('/jobs');
    });
  });

// POSTMAN WORKS
router.get('/new', function(req, res, next) {
  return res.json('New Jobs it works');
});

// POSTMAN WORKS
router.get('/:job_id/edit', function(req, res, next) {
  return Job.findById(req.params.job_id)
    .populate('Company')
    .then(job => {
      return res.json({ job });
    });
});

router
  // POSTMAN WORKS
  .get('/:job_id', function(req, res, next) {
    return Job.findById(req.params.job_id)
      .populate('Company')
      .then(job => {
        return res.json({ job });
      });
  })
  // .post('/:job_id', function(req, res, next) {
  //   return Job.create(req.body).then(() => {
  //     return res.redirect('/:job_id');
  //   });
  // })

  // POSTMAN WORKS
  .patch('/:job_id', function(req, res, next) {
    return Job.findByIdAndUpdate(req.params.job_id, req.body).then(() => {
      return res.json('/:job_id');
    });
  })
  // Will need to update the response, otherwise POSTMAN WORKS
  .delete('/:job_id', function(req, res, next) {
    return Job.findByIdAndRemove(req.params.job_id).then(() => {
      return res.redirect('/jobs');
    });
  });

// POSTMAN WORKS
router.get('/:job_id/applicants', function(req, res, next) {
  return Job.findById(req.params.job_id)
    .populate('User')
    .then(job => {
      return res.json({ job });
    });
});

// POSTMAN WORKS
router.get('/:job_id/apply', function(req, res, next) {
  return Job.findById(req.params.job_id).then(job => {
    return res.json('hey apply job');
  });
});

module.exports = router;
