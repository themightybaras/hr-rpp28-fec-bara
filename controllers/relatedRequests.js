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
  // If req.cookies has atelier property
  if (req.cookies.atelier) {
    //    if indexOf id < 0
    if (req.cookies.atelier.indexOf(req.body.id) < 0) {
      //      Add if to string (maybe split, sort, join - order may matter elsewhere in app)
      res.cookie('atelier', req.cookies.atelier.split(',').push(req.body.id).sort().join(','));
    }
  } else {
    // Else define new cookie with atelier property = rq body id
    res.cookie('atelier', req.body.id);
  }
  // console.log('Response cookie after calling addToOutfit: ', res.cookies);
  res.end();
};

const removeFromOutfit = (req, res) => {
  // console.log('Cookie before removal: ', req.cookies);
  let idToRemove = req.url.split('?')[1];
  let newCookie = _.without(req.cookies.atelier.split(','), idToRemove);
  if (newCookie.length > 0) {
    res.cookie('atelier', newCookie);
  } else {
    res.clearCookie('atelier');
  }
  // console.log('Cookie after removal: ', res.cookies);
  res.end();
};

const getOutfit = (req, res) => {
  console.log(' Req cookie when getting outfit: ', req.cookies);
  if (req.cookies.atelier) {
    let outfitCalls = req.cookies.atelier.split(',').map((id) => {
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
              return _.extend(response1.data, response2.data);
            });
        });
    });
    Promise.all(outfitCalls).then((products) => {
      console.log(products[0].results[1].photos);
      res.send(products);
    });
  } else {
    res.send([]);
  }
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
module.exports.getOutfit = getOutfit;
module.exports.removeFromOutfit = removeFromOutfit;
