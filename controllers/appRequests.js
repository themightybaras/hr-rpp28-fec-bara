const axios = require('axios');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getCurrentProductInfo = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  // only need features for ocmparison?
  //  product short name and features
  // console.log('app call for current product request body: ', req.body);
  let currentProductId = req.url.split('=')[1];
  axios({
    method: 'get',
    url: baseURL + `/products/${currentProductId}`
  })
    .then((response) => {
      res.send(response.data);
    });
};

module.exports.getCurrentProductInfo = getCurrentProductInfo;