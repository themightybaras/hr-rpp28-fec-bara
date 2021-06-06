const axios = require('axios');
const _ = require('underscore');
const Promise = require('bluebird');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

/**
 * Image: GET /products/:product_id/styles
 * Category: GET /products/:product_id
 * Name: GET /products/:product_id
 * Price: GET /products/:product_id/styles
 * Review: ? - NOT IN ANY RETURNED PRODUCTS OBJECT. ASK SARA WHICH API REQUEST (RATING) MAKES SENSE
 * features: GET /products/:product_id
 */

// How do we select a style for the related product - documentation says defautl style

const getRelated = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  // Get related products (returns array of product IDs)
  axios({
    method: 'get',
    url: baseURL + '/products/22126/related'
  })
    .then((response) => {
    // For each related product (id)
    //    Map ID to promisified GET request (maybe multiple, depending on above)
    // OPTIMIZATION - only pull first three related products for initial render
      // let stdProdCalls = _.chain(response.data).uniq().value().slice(0, 3).map((id) => {
      let stdProdCalls = _.chain(response.data).uniq().value().map((id) => {
        return axios({
          method: 'get',
          url: `${baseURL}/products/${id}`
        })
          .then((response) => {
            return response.data;
          });
      });
      // Use Promise.all() to wait for all resolved API calls for additional product info
      Promise.all(stdProdCalls).then((products) => {
        // use _.pick (and combining function) if data size is reducing performance
        //let uniqueProducts = _.uniq(products, 'id');
        // let trimmed = products.map((product) => {
        //   return _.uniq(product, 'id');
        // });
        res.send(products);
      });
      //  Send response data
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

module.exports.getRelated = getRelated;
