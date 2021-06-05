const axios = require('axios');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getQuestions = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios({
    method: 'get',
    url: baseURL + '/qa/questions' + '?' + req.url.split('?')[1]
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};


module.exports = {
  getQuestions
};
