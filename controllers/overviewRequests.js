/* eslint-disable camelcase */
const axios = require('axios');
const { url } = require('inspector');
const _ = require('underscore');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';


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

};


module.exports = {
  getProductStyles, getCurrentProduct
};


