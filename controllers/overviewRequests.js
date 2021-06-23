/* eslint-disable camelcase */
const axios = require('axios');
const { url } = require('inspector');
const _ = require('underscore');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

// const getProducts = (req, res) => {
//   axios.defaults.headers.common['Authorization'] = APIKey;
//   // Get related products (returns array of product IDs)
//   axios({
//     method: 'get',
//     url: baseURL + req.url
//   })
//     .then ((products) => {
//       res.send(products.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const getProductStyles = ((req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios({
    method: 'get',
    url: baseURL + req.url
  })
    .then (data => {
      console.log('REQ URL', req.url);
      res.send(data.data);
    });
});

const getCurrentProduct = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;

  axios({
    method: 'get',
    url: baseURL + req.url
  })
    .then (data => {
      res.send(data.data);
    });


  // axios({
  //   method: 'get',
  //   url: baseURL + req.url
  // })
  //   .then((response1) => {
  //     return axios({
  //       method: 'get',
  //       url: baseURL + req.url + '/styles'
  //     })
  //       .then((response2) => {
  //         console.log('EXTEND,', _.extend(response1.data, response2.data));
  //         res.send (_.extend(response1.data, response2.data));
  //       });
  //   });
};


module.exports = {
  getProductStyles, getCurrentProduct
};


// export getProducts