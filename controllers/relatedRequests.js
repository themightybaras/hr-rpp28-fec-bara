const axios = require('axios');
const _ = require('underscore');
const Promise = require('bluebird');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

// Helper function to get cropped url
const cropUrl = (origUrl, newWidth) => {
  if (!origUrl) {
    return '';
  }
  newWidth = newWidth || '350';
  return origUrl.split('crop')[0] + `crop&w=${newWidth}&q=80`;
};


// RELATED PRODUCTS

const getRelated = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  // Get related products (returns array of product IDs)
  let currentProductId = req.url.split('=')[1];
  axios({
    method: 'get',
    url: baseURL + `/products/${currentProductId}/related`
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
                // get review meta data
                return axios({
                  method: 'get',
                  url: `${baseURL}/reviews/meta?product_id=${id}` ///reviews/meta?product_id=22161
                })
                  .then((response3) => {
                    // Extend product info with product styles and return
                    let combined = _.extend(response1.data, response2.data);
                    //console.log('response3 ratings', response3.ratings);
                    combined.ratings = response3.data.ratings;
                    let results = combined.results || [];
                    // Selected style should be default, or first if no default
                    let firstProduct = _.where(results, { 'default?': true});
                    if (firstProduct.length === 0) {
                      if (results) {
                        firstProduct = [results[0]];
                      } else {
                        firstProduct = [];
                      }
                    }
                    if (firstProduct[0].photos[0]) {
                      delete firstProduct[0].photos[0].thumbnail_url;
                      firstProduct[0].photos[0].url = cropUrl(firstProduct[0].photos[0].url, 350);
                    }

                    combined.results = firstProduct;
                    return combined;
                    // old end of response 2

                  });
              });
          });
      });
      // Resolve all API Calls then return to client
      Promise.all(prodCalls).then((products) => {
        // use _.pick (and combining function) if data size is reducing performance
        res.status(200).send(products);
      });
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

// OUTFIT - add type handling if more errors

const addToOutfit = (req, res) => {
  console.log('addToOutfit, request cookie: ', req.cookies);
  console.log('addToOutfit, request body: ', req.body);
  // If req.cookies has atelier property
  if (req.cookies.atelier) {
    // Only add id to cookie if it doesn't exist
    if (req.cookies.atelier.indexOf(req.body.id) < 0) {
      let updatedCookie = req.cookies.atelier + ',' + req.body.id;
      console.log('addToOutfit, updatedCookie var: ', updatedCookie);
      res.cookie('atelier', updatedCookie);
      console.log('addToOutfit, response cookie after adding to existing: ', res.cookies);
      res.end();
    }
  } else {
    // Else define new cookie with atelier property = req body id
    res.cookie('atelier', req.body.id); // Attaching as string here
    console.log('addToOutfit, response cookie after creating new cookie: ', res.cookies);
    res.end();
  }
};


const getOutfit = (req, res) => {
  console.log('getOutfit, request cookie: ', req.cookies.atelier);
  // let altcookie = req.get('Cookie');
  // console.log('getOutfit, alt cookie: ', altcookie);
  // console.log('Cookies in related get call, type: ', typeof(req.cookies.atelier));
  // res.clearCookie('atelier');
  // res.end();

  if (req.cookies.atelier) {
    let atelierCookies = req.cookies.atelier.split(',');
    let outfitCalls = atelierCookies.map((id) => {
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
      res.status(200).send(products);
    });
  } else {
    res.send([]);
  }
};

const removeFromOutfit = (req, res) => {
  console.log('removeFromOutfit, request cookie: ', req.cookies);
  let idToRemove = req.url.split('?')[1];
  console.log('removeFromOutfit, id to remove: ', idToRemove);
  // console.log('id to remove, type: ', typeof(idToRemove)); //string
  let newCookie = _.without(req.cookies.atelier.split(','), idToRemove).join(',');
  // let newCookie = _.without(req.cookies.atelier, idToRemove); // THIS IS THE PROBLEM
  console.log('removeFromOutfit, New cookie: ', newCookie);
  if (newCookie.length > 0) {
    res.cookie('atelier', newCookie);
    res.end();
  } else {
    res.clearCookie('atelier');
    res.end();
  }
};


module.exports.getRelated = getRelated;
module.exports.addToOutfit = addToOutfit;
module.exports.getOutfit = getOutfit;
module.exports.removeFromOutfit = removeFromOutfit;
