const axios = require('axios');
const _ = require('underscore');
const Promise = require('bluebird');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

// OUTFIT - add type handling if more errors

const addToOutfit = (req, res) => {
  console.log('add to outfit, cookies', req.cookies);
  console.log('add to outfit, cookies type: ', typeof(req.cookies));
  console.log('add to outfit, body: ', req.body);
  console.log('add to outfit, body type: ', typeof(req.body)); // id in body object is string

  // If req.cookies has atelier property
  if (req.cookies.atelier) {
    // Only add id to cookie if it doesn't exist
    if (req.cookies.atelier.indexOf(req.body.id) < 0) {
      //      Add if to string (maybe split, sort, join - order may matter elsewhere in app)
      res.cookie('atelier', req.cookies.atelier.split(',').push(req.body.id).sort().join(','));
      console.log('Response cookie after calling addToOutfit: ', res.cookies);
      res.end();
    }
  } else {
    // Else define new cookie with atelier property = req body id
    res.cookie('atelier', req.body.id); // Attaching as string here
    console.log('Response cookie after calling addToOutfit: ', res.cookies);
    res.end();
  }
};


const getOutfit = (req, res) => {
  console.log('Cookies in get call: ', req.cookies.atelier);
  console.log('Cookies in get call, type: ', typeof(req.cookies.atelier));
  // res.clearCookie('atelier');
  // res.end();

  if (req.cookies.atelier) {
    let outfitCalls = req.cookies.atelier.split(',').map((id) => {
    // let outfitCalls = req.cookies.atelier.map((id) => {
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
      res.send(products);
    });
  } else {
    res.send([]);
  }
};

const removeFromOutfit = (req, res) => {
  console.log('Cookie before removal: ', req.cookies);
  let idToRemove = req.url.split('?')[1];
  console.log('id to remove: ', idToRemove);
  console.log('id to remove, type: ', typeof(idToRemove)); //string
  let newCookie = _.without(req.cookies.atelier.split(','), idToRemove);
  // let newCookie = _.without(req.cookies.atelier, idToRemove); // THIS IS THE PROBLEM
  console.log('New cookie in remove call: ', newCookie);
  if (newCookie.length > 0) {
    res.cookie('atelier', newCookie);
    res.end();
  } else {
    res.clearCookie('atelier');
    res.end();
  }
  console.log('Cookie after removal: ', res.cookies); // Says it's undefined but getOutfit splitting id
};

// RELATED PRODUCTS

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
