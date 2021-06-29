const axios = require('axios');
const APIKey = require('../config.js');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
//const cloudinaryConfig = require('../config2.js');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';


const getQuestions = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.get(baseURL + req.url + '&count=100')
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const postQuestion = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.post(baseURL + req.url, req.body)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const postAnswer = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.post(baseURL + req.url, req.body)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const markQuestionHelpful = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.put(baseURL + req.url)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const markAnswerHelpful = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.put(baseURL + req.url)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const reportAnswer = (req, res) => {
  axios.defaults.headers.common['Authorization'] = APIKey;
  axios.put(baseURL + req.url)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.status(err.response.status).send(err);
    });
};

const postPhotos = (req, res) => {
  cloudinary.config({
    'cloud_name': cloudinaryConfig.cloudName,
    'api_key': cloudinaryConfig.APIKey,
    'api_secret': cloudinaryConfig.APISecret
  });

  let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };

  var promises = [];
  req.files.map((element) => {
    promises.push(streamUpload(element.buffer));
  });

  Promise.all(promises)
    .then((response) => {
      res.send(response);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

module.exports = {
  getQuestions,
  postQuestion,
  postAnswer,
  markQuestionHelpful,
  markAnswerHelpful,
  reportAnswer,
  postPhotos
};
