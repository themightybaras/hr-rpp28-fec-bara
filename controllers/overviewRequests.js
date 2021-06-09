/* eslint-disable camelcase */
const axios = require('axios');
const _ = require('underscore');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getProducts = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  // Get related products (returns array of product IDs)
  axios({
    method: 'get',
    url: baseURL + '/products/22126/related'
  })
    .then((response) => {
      // For each related product (id), retrieve product info and product styles objects
      //    Map ID to promisified GET request (maybe multiple, depending on above)
      // OPTIMIZATION - only pull first three related products for initial render
      let prodCalls = _.uniq(response.data).map((id) => {
        return axios({
          method: 'get',
          url: `${baseURL}/products/${id}`
        })
          .then((response1) => {
            return axios({
              method: 'get',
              url: `${baseURL}/products/${id}/styles`
            })
              .then((response2) => {
                return _.extend(response1.data, response2.data.results[0]);
              });
          });
      });
      Promise.all(prodCalls).then((products) => {
        res.send(products);
      })
        .catch((err) => {
          console.log(err);
        });
    });
};



module.exports = {
  getProducts
};
