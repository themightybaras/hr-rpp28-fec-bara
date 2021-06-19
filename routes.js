var reviewsRequests = require('./controllers/reviewsRequests');
var questionsRequests = require('./controllers/questionsRequests');
const relatedRequests = require('./controllers/relatedRequests');
var overviewRequests = require('./controllers/overviewRequests');
var appRequests = require('./controllers/appRequests');
var router = require('express').Router();

// connect controller methods to their corresponding routes

// App routes
router.get('/app', appRequests.getCurrentProductInfo);

//overview routes
router.get('/products', overviewRequests.getProducts);
router.get('/products/:product_id/styles', overviewRequests.getProductStyles);

//question routes
router.get('/qa/questions', questionsRequests.getQuestions);
router.post('/qa/questions', questionsRequests.postQuestion);
router.post('/qa/questions/:question_id/answers', questionsRequests.postAnswer);

//related routes
router.get('/related', relatedRequests.getRelated);
router.post('/outfit', relatedRequests.addToOutfit);
router.get('/outfit', relatedRequests.getOutfit);
router.delete('/outfit', relatedRequests.removeFromOutfit);

//review routes
router.get('/reviews', reviewsRequests.getReviews);
router.get('/reviews/meta', reviewsRequests.getReviewMetadata);
router.post('/reviews', reviewsRequests.addReview);
router.put('/reviews/:review_id/helpful', reviewsRequests.markHelpful);
router.put('/reviews/:review_id/report', reviewsRequests.reportReview);

module.exports = router;
