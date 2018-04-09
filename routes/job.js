const express = require('express');
const router = express.Router();
const { authHandlers, jobHandlers } = require('../handlers');
const { authorizeToken } = require('../helpers');
router
  .route('/')
  .get(jobHandlers.getAllJobs)
  .post(authorizeToken.authorizeToken, jobHandlers.createJob);

router.route('/new').get(authorizeToken.authorizeToken, jobHandlers.newJobForm);

router
  .route('/:jobId/edit')
  .get(authorizeToken.authorizeToken, jobHandlers.editJobForm);

router
  .route('/:jobId')
  .get(jobHandlers.getIndividualJob)
  .patch(authorizeToken.authorizeToken, jobHandlers.editJob)
  .delete(authorizeToken.authorizeToken, jobHandlers.deleteJob);

router.route('/:jobId/applicants').get(jobHandlers.getApplicants);

router
  .route('/:jobId/apply')
  .get(authorizeToken.authorizeToken, jobHandlers.applyForJob);

module.exports = router;
