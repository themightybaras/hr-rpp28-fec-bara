const axios = require('axios');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getQuestions = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.get(baseURL + req.url + '&count=100')
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const postQuestion = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.post(baseURL + req.url, req.body)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const postAnswer = (req, res) => {
  console.log(req.body);
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.post(baseURL + req.url, req.body)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};


module.exports = {
  getQuestions,
  postQuestion,
  postAnswer
};
