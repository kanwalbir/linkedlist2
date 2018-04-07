const express = require("express");
const router = express.Router();
const { authorizeToken } = require("../helpers");
const { userHandlers } = require("../handlers");

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
  .route("/:username")
  .get(authorizeToken.authorizeToken, userHandlers.displayUser)
  .patch(authorizeToken.authorizeToken, userHandlers.updateUser)
  .delete(authorizeToken.authorizeToken, userHandlers.deleteUser);

router
  .route("/:username/edit")
  .get(authorizeToken.authorizeToken, userHandlers.renderUserEditPage);

router
  .route("/:username/messages")
  .get(authorizeToken.authorizeToken, userHandlers.userMessages);

router
  .route("/:username/applications")
  .get(authorizeToken.authorizeToken, userHandlers.userApplications);

// DRAFT WILL FIX DURING AUTHENTICATION
router.route("/:username/connect").patch(userHandlers.userConnections);

module.exports = router;
