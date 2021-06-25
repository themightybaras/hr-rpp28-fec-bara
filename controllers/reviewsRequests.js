
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const APIKey = require('../config.js');
var axios = require('axios');

module.exports = {
  getReviews: function(req, res) {
    axios.defaults.headers.common['Authorization'] = APIKey;
    console.log('REQUEST URL', req.url);
    axios({
      method: 'get',
      url: baseURL + req.url
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

    console.log('URL', req.url);

    axios({
      method: 'get',
      url: baseURL + req.url
      //need to add param product id????
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
      url: baseURL + req.url
    })
      .then((response) => {
        res.status(200).send('Marked Helpful in API');
      })
      .catch((err) => {
        res.status(400).send('ERROR Marking Review Helpful in API:', err);
      });

  },

  reportReview: function(req, res) {
    axios.defaults.headers.common['Authorization'] = APIKey;
    axios({
      method: 'put',
      url: baseURL + req.url
    })
      .then((response) => {
        res.status(200).send('Reported in API');
      })
      .catch((err) => {
        res.status(400).send('ERROR Reporting Review in API:', err);
      });
  }

};
