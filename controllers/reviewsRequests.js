
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const APIKey = require('../config.js');
var axios = require('axios');

module.exports = {
  getReviews: function(req, res) {
    axios.defaults.headers.common['Authorization'] = APIKey;
    axios({
      method: 'get',
      url: baseURL + req.url,
      //need to add params : page, count, sort, and product id
      // params: {product_id: req.query.productID}
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(400).send('Error getting Reviews from API:', err);
      });
  },

  getReviewMetadata: function(req, res) {
    axios.defaults.headers.common['Authorization'] = APIKey;
    axios({
      method: 'get',
      url: baseURL + '/reviews/meta',
      //need to add param product id
      params: {}
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  addReview: function(req, res) {
    axios.defaults.headers.common['Authorization'] = APIKey;
    axios({
      method: 'post',
      url: baseURL + '/reviews',
      //need to add params product-ID, rating, summary, body, reccomend, name, email, photos, characteritics
      params: {}
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  markHelpful: function(req, res) {

    axios.defaults.headers.common['Authorization'] = APIKey;
    axios({
      method: 'put',
      url: baseURL + '/reviews/' + req.body.review_id + '/helpful',
      //need to add params review id
      params: {}
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.sendStatus(404);
      });

  },

  reportReview: function(req, res) {
    axios.defaults.headers.common['Authorization'] = APIKey;
    axios({
      method: 'put',
      url: baseURL + '/reviews/' + req.body.review_id + '/report',
      //need to add params review id
      params: {}
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  }

};
