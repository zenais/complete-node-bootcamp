const express = require('express');
const tourControler = require(`./../controlers/tourControler`);

const router = express.Router();

router.route('/').get(tourControler.getAllTours).post(tourControler.addNewTour);

router
  .route('/:id')
  .get(tourControler.searchTourById)
  .patch(tourControler.updateTourById)
  .delete(tourControler.deleteTourById);

module.exports = router;
