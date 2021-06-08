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

const addToOutfit = (req, res) => {
  console.log('Body: ', req.body);
  console.log('Outfit request cookies', req.cookies);
  res.cookie('atelier', req.body.id);
  res.end();
};

const getRelated = (req, res) => {
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
            // response.data is the resulting object
            // Extend with result of style call for same ID
            return axios({
              method: 'get',
              url: `${baseURL}/products/${id}/styles`
            })
              .then((response2) => {
                // Extend product info with product styles and return
                return _.extend(response1.data, response2.data);
              });
          });
      });
      // Resolve all API Calls then return to client
      Promise.all(prodCalls).then((products) => {
        // use _.pick (and combining function) if data size is reducing performance
        res.send(products);
      });
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

module.exports.getRelated = getRelated;
module.exports.addToOutfit = addToOutfit;
