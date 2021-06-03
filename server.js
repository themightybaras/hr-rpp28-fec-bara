const express = require('express');
const PATH = require('path');
const axios = require('axios');
const APIKey = require('./config.js');
const $ = require('jquery');
const app = express();
const port = 3000;

app.use(express.static(PATH.join(__dirname, 'client', 'dist')));


app.get('/qa/questions', (req, res) => {

  axios.defaults.headers.common['Authorization'] = APIKey;
  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
    params: { product_id : 22126}
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});