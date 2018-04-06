const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const { userHandlers } = require('../handlers');

router.get('/login', userHandlers.userLogin);

router.get('/signup', userHandlers.userSignup);

router
  .get('/', userHandlers.showAllUsers)
  .post('/', userHandlers.createNewUser);

router
  .get('/:user_id', userHandlers.displayUser)
  .patch('/:user_id', userHandlers.updateUser)
  .delete('/:user_id', userHandlers.deleteUser);

router.get('/:user_id/edit', userHandlers.renderUserEditPage);

router.get('/:user_id/messages', userHandlers.userMessages);

router.get('/:user_id/applications', userHandlers.userApplications);

// DRAFT WILL FIX DURING AUTHENTICATION
router.patch('/:user_id/connect', userHandlers.userConnections);

module.exports = router;
