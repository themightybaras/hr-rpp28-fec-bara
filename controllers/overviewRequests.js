const axios = require('axios');
const APIKey = require('../config.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const getProducts = (req, res) => {
  axios.get(baseURL + '/products/', {
    headers: {
      'Authorization': APIKey
    }
  });
};
//   axios.defaults.headers.common['Authorization'] = APIKey;
//   axios({
//     method: 'get',
//     url: baseURL + '/products'
//   })
//     .then ((data)=> {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   ;
// };

module.exports = {
  getProducts
};