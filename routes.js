const reviewsRequests = require('./controllers/reviewsRequests');
const questionsRequests = require('./controllers/questionsRequests');
const relatedRequests = require('./controllers/relatedRequests');
const overviewRequests = require('./controllers/overviewRequests');
const appRequests = require('./controllers/appRequests');
const router = require('express').Router();

// connect controller methods to their corresponding routes

// App routes
router.get('/app', appRequests.getCurrentProductInfo);
router.post('/interactions', appRequests.saveInteractionData);

//overview routes
router.get('/products/:product_id/styles', overviewRequests.getProductStyles);
router.get('/products/:product_id', overviewRequests.getCurrentProduct);

//question routes
router.get('/qa/questions', questionsRequests.getQuestions);
router.post('/qa/questions', questionsRequests.postQuestion);
router.post('/qa/questions/:question_id/answers', questionsRequests.postAnswer);
router.put('/qa/questions/:question_id/helpful', questionsRequests.markQuestionHelpful);
router.put('/qa/answers/:answer_id/helpful', questionsRequests.markAnswerHelpful);
router.put('/qa/answers/:answer_id/report', questionsRequests.reportAnswer);
router.post('/qa/photos', questionsRequests.postPhotos);

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
router.post('/reviews/photos', reviewsRequests.postPhotos);

module.exports = router;
