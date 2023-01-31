const express = require('express');
const userControlers = require('./../controlers/userControler');
const router = express.Router();

router
  .route('/')
  .get(userControlers.getAllUsers)
  .post(userControlers.createUser);

router
  .route('/:id')
  .get(userControlers.getUserById)
  .patch(userControlers.updateUserInfoById)
  .delete(userControlers.deleteUserById);

module.exports = router;
