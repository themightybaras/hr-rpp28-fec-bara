const express = require('express');
const PATH = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();
const upload = multer();
const port = 3000;

app.use(express.static(PATH.join(__dirname, 'client', 'dist')));
app.use('/outfit', cookieParser());
app.use('/outfit', express.urlencoded({extended: true}));
app.use('/app', express.urlencoded({extended: true}));
app.use('/related', express.urlencoded({extended: true}));
app.use('/qa/photos', upload.array('answerPhotos'));
app.use('/reviews/photos', upload.array('reviewPhoto'));

//this tells our server to refer to our routes file when requests are made to "/" (aka all request)
var router = require('./routes.js');
//app.use('/', bodyParser.json());
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});