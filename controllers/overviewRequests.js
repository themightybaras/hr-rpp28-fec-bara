/* eslint-disable camelcase */
const axios = require('axios');
const { url } = require('inspector');
const _ = require('underscore');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getProducts = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  // Get related products (returns array of product IDs)
  axios({
    method: 'get',
    url: baseURL + '/products',
  })
    .then ((products) => {
      res.send(products.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProductStyles = ((req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios({
    method: 'get',
    url: baseURL + req.url
  })
    .then (data => {
      //console.log(data.data);
      res.send(data.data);
    });
  // res.send('hello');
});



module.exports = {
  getProducts, getProductStyles
};
