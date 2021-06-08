const express = require('express');
const PATH = require('path');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.static(PATH.join(__dirname, 'client', 'dist')));
app.use('/outfit', cookieParser());
app.use('/outfit', express.urlencoded({extended: true}));
app.use('/related', express.urlencoded({extended: true}));

//this tells our server to refer to our routes file when requests are made to "/" (aka all request)
var router = require('./routes.js');
app.use('/', bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});