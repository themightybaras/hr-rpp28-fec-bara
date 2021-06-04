var controller = require('./controllers');
var router = require('express').Router();

// connect controller methods to their corresponding routes

//overview routes

//question routes

//related routes


//review routes
router.get('/reviews', controllers.reviewRequests.getReviews);
router.get('/reviews/meta', controllers.reviewRequests.getReviewMetadata);
router.post('/reviews', controllers.reviewRequests.addReview);
router.put('/reviews/:review_id/helpful', controllers.reviewRequests.markHelpful);
router.put('/reviews/:review_id/report', controllers.reviewRequests.reportReview);

module.exports = router;
