var reviewsRequests = require('./controllers/reviewsRequests');
var questionsRequests = require('./controllers/questionsRequests');
const relatedRequests = require('./controllers/relatedRequests');
var router = require('express').Router();

// connect controller methods to their corresponding routes

//overview routes

//question routes
router.get('/qa/questions', questionsRequests.getQuestions);

//related routes
router.get('/related', relatedRequests.getRelated);

//review routes
router.get('/reviews', reviewsRequests.getReviews);
router.get('/reviews/meta', reviewsRequests.getReviewMetadata);
router.post('/reviews', reviewsRequests.addReview);
router.put('/reviews/:review_id/helpful', reviewsRequests.markHelpful);
router.put('/reviews/:review_id/report', reviewsRequests.reportReview);

module.exports = router;
