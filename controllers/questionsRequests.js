const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const APIKey = require('../config.js');
const axios = require('axios');

module.exports = {
  getQuestions: function(req, res) {
    axios.defaults.headers.common['Authorization'] = APIKey;
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
      // params: { product_id: 22126}
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  }
};
