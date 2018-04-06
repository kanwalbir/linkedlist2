const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const { userHandlers } = require('../handlers');

router.get('/login', userLogin);

router.get('/signup', userSignup);

router.get('/', showAllUsers).post('/', createNewUser);

router
  .get('/:user_id', displayUser)
  .patch('/:user_id', updateUser)
  .delete('/:user_id', deleteUser);

router.get('/:user_id/edit', renderUserEditPage);

router.get('/:user_id/messages', userMessages);

router.get('/:user_id/applications', userApplications);

// DRAFT WILL FIX DURING AUTHENTICATION
router.patch('/:user_id/connect', userConnections);

module.exports = router;
