const axios = require('axios');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getQuestions = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.get(baseURL + '/qa/questions' + '?' + req.url.split('?')[1])
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.sned(err.message);
    });
};

const postQuestion = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.post('/qa/questions', {
    body: '',
    name: '',
    email: '',
    product_id: ''
  })
    .then(() => {
      res.end();
    })
    .catch((err) => {
      res.send(err.message);
    });
};


module.exports = {
  getQuestions,
  postQuestion
};
