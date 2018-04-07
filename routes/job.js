const express = require("express");
const router = express.Router();
const { authHandlers, jobHandlers } = require("../handlers");

router
  .route("/")
  .get(jobHandlers.getAllJobs)
  .post(jobHandlers.createJob);

router.route("/new").get(jobHandlers.newJobForm);

router.route("/:job_id/edit").get(jobHandlers.editJobForm);

router
  .route("/:job_id")
  .get(jobHandlers.getIndividualJob)
  .patch(jobHandlers.editJob)
  .delete(jobHandlers.deleteJob);

router.route("/:job_id/applicants").get(jobHandlers.getApplicants);

router.route("/:job_id/apply").get(jobHandlers.applyForJob);

module.exports = router;
