const axios = require('axios');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getCurrentProductInfo = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  // only need features for comparison?
  //  product short name and features
  // console.log('app call for current product request body: ', req.body);
  let currentProductId = req.url.split('=')[1];
  axios({
    method: 'get',
    url: baseURL + `/products/${currentProductId}`
  })
    .then((response) => {
      res.status(200).send(response.data);
    });
};

const saveInteractionData = (req, res) => {
  console.log(req.body);
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.post( baseURL + '/interactions', req.body)
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch ((err) => {
      res.status(422).send(err);
    });
};

module.exports = {
  getCurrentProductInfo,
  saveInteractionData
};