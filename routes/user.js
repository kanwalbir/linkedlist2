const express = require("express");
const router = express.Router();
const { authHandlers, userHandlers } = require("../handlers");

router
  .route("/login")
  .get(userHandlers.userLogin)
  .post(userHandlers.userAuthentication);

router.route("/signup").get(userHandlers.userSignup);

router
  .route("/")
  .get(userHandlers.showAllUsers)
  .post(userHandlers.createNewUser);

router
  .route("/:user_id")
  .get(authHandlers.ensureCorrectUser, userHandlers.displayUser)
  .patch(authHandlers.ensureCorrectUser, userHandlers.updateUser)
  .delete(authHandlers.ensureCorrectUser, userHandlers.deleteUser);

router
  .route("/:user_id/edit")
  .get(authHandlers.ensureCorrectUser, userHandlers.renderUserEditPage);

router
  .route("/:user_id/messages")
  .get(authHandlers.ensureCorrectUser, userHandlers.userMessages);

router
  .route("/:user_id/applications")
  .get(authHandlers.ensureCorrectUser, userHandlers.userApplications);

// DRAFT WILL FIX DURING AUTHENTICATION
router.route("/:user_id/connect").patch(userHandlers.userConnections);

module.exports = router;
