const express = require('express');
const router = express.Router();

const { jobHandlers } = require('../handlers');

const { User, Job, Company } = require('../models');

router.get('/', jobHandlers.getAllJobs).post('/', jobHandlers.createJob);

router.get('/new', jobHandlers.newJobForm);

router.get('/:job_id/edit', jobHandlers.editJobForm);

router
  .get('/:job_id', jobHandlers.getIndividualJob)

  .patch('/:job_id', jobHandlers.editJob)

  .delete('/:job_id', jobHandlers.deleteJob);

router.get('/:job_id/applicants', jobHandlers.getApplicants);

router.get('/:job_id/apply', jobHandlers.applyForJob);

module.exports = router;
