const express = require("express");
const router = express.Router();
const { authHandlers, jobHandlers } = require("../handlers");

router
  .route("/")
  .get(jobHandlers.getAllJobs)
  .post(jobHandlers.createJob);

router.route("/new").get(jobHandlers.newJobForm);

router.route("/:jobId/edit").get(jobHandlers.editJobForm);

router
  .route("/:jobId")
  .get(jobHandlers.getIndividualJob)
  .patch(jobHandlers.editJob)
  .delete(jobHandlers.deleteJob);

router.route("/:jobId/applicants").get(jobHandlers.getApplicants);

router.route("/:jobId/apply").get(jobHandlers.applyForJob);

module.exports = router;
