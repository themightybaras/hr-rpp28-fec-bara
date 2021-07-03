import React from 'react';
import ClickableStarRating from './ClickableStarRating.jsx';
import axios from 'axios';
import $ from 'jquery';
import Track from '../../Track.jsx';

class ReviewFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // REVIEW FORM ANSWERS
      rating: 0,
      ratingDisplayValue: null,
      recommend: 'unanswered',
      recommendDisplayValue: null,
      //characteristics
      size: 0,
      sizeDisplayValue: 'none selected',
      width: 0,
      widthDisplayValue: 'none selected',
      comfort: 0,
      comfortDisplayValue: 'none selected',
      quality: 0,
      qualityDisplayValue: 'none selected',
      length: 0,
      lengthDisplayValue: 'none selected',
      fit: 0,
      fitDisplayValue: 'none selected',
      summary: undefined,
      summaryCharacterCount: 0,
      body: undefined,
      bodyCharacterCount: 0,
      selectedFiles: null,
      photos: [],
      nickname: undefined,
      nicknameCharacterCount: 0,
      email: undefined,
      emailCharacterCount: 0

    };

    this.formInputSelectionChange = this.formInputSelectionChange.bind(this);
    this.formTextChange = this.formTextChange.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
    this.changeFileHandler = this.changeFileHandler.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
    this.clickUploadPhotosHandler = this.clickUploadPhotosHandler.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.createErrMsg = this.createErrMsg.bind(this);
    this.getCharacteristicIds = this.getCharacteristicIds.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //when selection is made, changes state
  formInputSelectionChange(e) {
    const target = e.target;
    const value = target.value; // number value
    const id = target.id; //string telling user what they selected in english
    const name = target.name; //how it is refered to in state
    const displayName = `${name}DisplayValue`;
    this.setState({
      [name]: value,
      [displayName]: id
    });
  }

  //when input text is changes, changes state
  formTextChange(e) {
    const target = e.target;
    const value = target.value; // what is entered into the field
    const count = value.length;
    const name = target.name; //how it is refered to in state
    const characterCount = `${name}CharacterCount`;
    this.setState({
      [name]: value,
      [characterCount]: count,
    });
  }

  // reverses state and closes modal window
  closeReviewModal() {
    event.preventDefault();
    this.setState({ rating: 0,
      ratingDisplayValue: null,
      recommend: 'unanswered',
      recommendDisplayValue: null,
      //characteristics
      size: 0,
      sizeDisplayValue: 'none selected',
      width: 0,
      widthDisplayValue: 'none selected',
      comfort: 0,
      comfortDisplayValue: 'none selected',
      quality: 0,
      qualityDisplayValue: 'none selected',
      length: 0,
      lengthDisplayValue: 'none selected',
      fit: 0,
      fitDisplayValue: 'none selected',
      summary: undefined,
      summaryCharacterCount: 0,
      body: undefined,
      bodyCharacterCount: 0,
      selectedFiles: [],
      photos: [],
      nickname: undefined,
      nicknameCharacterCount: 0,
      email: undefined,
      emailCharacterCount: 0});

    this.props.onClose();
  }


  //when user picks files, sets selected files state
  changeFileHandler(event) {
    event.preventDefault();
    let files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      files.push(event.target.files[i]);
    }
    this.setState({selectedFiles: files});
  }

  clickUploadPhotosHandler(event) {
    event.preventDefault();
    let formId = document.querySelector('#addReviewForm');
    let formInput = formId.getElementsByClassName('form-input');
    if (formInput['review-upload-photos']) {
      let imageFileInfo = formInput['review-upload-photos'].files;
      if (imageFileInfo) {
        //this.imageUpload();
        try {
          this.imageUpload();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  //makes call to cloudinary and sets photo urls in state
  imageUpload() {
    const data = new FormData();
    if (this.state.selectedFiles.length > 0) {
      this.state.selectedFiles.forEach((file) => {
        data.append('reviewPhoto', file);
      });
    }

    axios.post('/reviews/photos', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        this.setState({photos: [...this.state.photos, ...response.data]}, () => {
          console.log(this.state.photos);
        });
        this.setState({selectedFiles: null});
      })
      .catch(() => {
        console.log('ERROR: Image Upload Failed!');
      });
  }


  validateForm() {
    var overallRatingMissing = this.state.rating === 0;
    var recommendationMissing = this.state.recommend === 'unanswered';
    var sizeMissing = this.state.size === 0;
    var widthMissing = this.state.width === 0;
    var comfortMissing = this.state.comfort === 0;
    var qualityMissing = this.state.quality === 0;
    var lengthMissing = this.state.length === 0;
    var fitMissing = this.state.fit === 0;
    var reviewBodyIssue = (this.state.body === undefined) || (this.state.body.length < 50) || (this.state.body.length > 1000);
    var photoIssue = this.state.selectedFiles !== [] && this.state.photos.length === 0;
    var emailIssue = this.state.email === undefined || (this.state.email.indexOf('@') === -1 || this.state.email.indexOf('.') === -1);

    var errMessage = this.createErrMsg(overallRatingMissing, recommendationMissing, sizeMissing, widthMissing, comfortMissing, qualityMissing, lengthMissing, fitMissing, reviewBodyIssue, photoIssue, emailIssue);

    if (errMessage !== '') {
      alert(errMessage);
      return false;
    }

    return true;
  }

  createErrMsg(overallRatingMissing, recommendationMissing, sizeMissing, widthMissing, comfortMissing, qualityMissing, lengthMissing, fitMissing, reviewBodyIssue, photoIssue, emailIssue) {
    var errMessage = '';
    if (overallRatingMissing || recommendationMissing || sizeMissing || widthMissing || comfortMissing || qualityMissing || lengthMissing || fitMissing || reviewBodyIssue || photoIssue || emailIssue) {

      errMessage += 'You must correct the following:\n\n';

      if (overallRatingMissing) {
        errMessage += '  Your Overall Rating \n';
      }
      if (recommendationMissing) {
        errMessage += '  Your Recomendation \n';
      }
      if (sizeMissing) {
        errMessage += '  Your Size Rating \n';
      }
      if (widthMissing) {
        errMessage += '  Your Width Rating \n';
      }
      if (comfortMissing) {
        errMessage += '  Your Comfort Rating \n';
      }
      if (qualityMissing) {
        errMessage += '  Your Quality Rating \n';
      }
      if (lengthMissing) {
        errMessage += '  Your Length Rating \n';
      }
      if (fitMissing) {
        errMessage += '  Your Fit Rating \n';
      }
      if (reviewBodyIssue) {
        errMessage += '  Your Review Body \n';
      }
      if (photoIssue) {
        errMessage += '  Your Photo Uploads \n';
      }
      if (emailIssue) {
        errMessage += '  Your Email \n';
      }
      errMessage += '\n';
    }
    return errMessage;
  }

  getCharacteristicIds() {
    var characteristicsKeys = Object.keys(this.props.reviewMetaData.characteristics);
    var characteristicObj = {};
    for ( var key in characteristicsKeys) {
      var characteristicName = characteristicsKeys[key];
      var currentId = this.props.reviewMetaData.characteristics[characteristicName].id;
      var currentValue = parseInt(this.state[characteristicName.toLowerCase()]);
      characteristicObj[currentId] = currentValue;
    }
    return characteristicObj;
  }

  handleSubmit(e) {
    //validate inputs required
    if (this.validateForm()) {
      var url = '/reviews';
      var recommendBoolean = this.state.recommend === 'yes';
      var characteristicValues = this.getCharacteristicIds();
      var data = {
        'product_id': parseInt(this.props.reviewMetaData.product_id),
        rating: parseInt(this.state.rating),
        summary: this.state.summary,
        body: this.state.body,
        recommend: recommendBoolean,
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.photos,
        characteristics: characteristicValues
      };
      //axios request
      axios.post(url, data)
        .then(() => {
          this.closeReviewModal();
          this.props.getProductReviews();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className = 'modal' id = 'addReviewContainer'>
        <div className = 'addReviewFormContent'>
          <br/>
          <button onClick = {this.closeReviewModal}> &times; </button>
          <form id = 'addReviewForm'>
            <h2>Write Your Review </h2>
            <h3> About the {this.props.currentProductName}</h3><br/>
            <div>
              <h4>Rate the product:</h4><br/>
              <ClickableStarRating collectRating = {this.formInputSelectionChange}/><br/>
              {this.state.ratingDisplayValue
                ? <span id='ratingSelection' >{this.state.ratingDisplayValue}</span>
                : null
              }
              <br/>
            </div><br/>
            <div id= 'recommendQuestionContainer' onChange={this.formInputSelectionChange}>
              <h4>Do you recommend this product? *</h4>
              {this.state.recommendDisplayValue
                ? <div><span>{this.state.recommendDisplayValue}</span><br/></div>
                : null
              }
              <input type='radio' id = 'Yes, I recommend this product' name='recommend' value='yes' required/>
              <label htmlFor='Yes, I recommend this product'>Yes</label>
              <input type='radio' id = 'No, I do not recommend this product' name='recommend' value='no'/>
              <label htmlFor='No, I do not recommend this product'>No</label>
            </div><br/>
            <div id='characteristicsQuestionsContainer'>
              <h4>Please Rate The Following Characteristics *</h4>
              <br/>
              <div id ='sizeQuestionContainer' onChange={this.formInputSelectionChange}>
                <span className='characteristicTitle'>Size</span><span>:  {this.state.sizeDisplayValue}</span><br/>
                <br/>
                <span>A size too small   </span>
                <input type='radio' id='A size too small' name='size' value='1' required/>
                <input type='radio' id='1/2 a size too small' name='size' value='2'/>
                <input type='radio' id='Perfect' name='size' value='3'/>
                <input type='radio' id='1/2 a size too big' name='size' value='4'/>
                <input type='radio' id='A size too big' name='size' value='5'/>
                <span>   A size too big</span>
              </div><br/>
              <div id ='widthQuestionContainer' onChange={this.formInputSelectionChange}>
                <span className='characteristicTitle'>Width</span><span>:  {this.state.widthDisplayValue}</span><br/>
                <br/>
                <span>Too Narrow   </span>
                <input type='radio' id='Too Narrow' name='width' value='1' required/>
                <input type='radio' id='Slightly Narrow' name='width' value='2'/>
                <input type='radio' id='Perfect' name='width' value='3'/>
                <input type='radio' id='Slightly Wide' name='width' value='4'/>
                <input type='radio' id='Too Wide' name='width' value='5'/>
                <span>   Too Wide</span>
              </div><br/>
              <div id ='comfortQuestionContainer' onChange={this.formInputSelectionChange}>
                <span className='characteristicTitle'>Comfort</span><span>:  {this.state.comfortDisplayValue}</span><br/>
                <br/>
                <span>Uncomfortable   </span>
                <input type='radio' id='Uncomfortable' name='comfort' value='1' required/>
                <input type='radio' id='Slightly uncomfortable' name='comfort' value='2'/>
                <input type='radio' id='Ok' name='comfort' value='3'/>
                <input type='radio' id='Comfortable' name='comfort' value='4'/>
                <input type='radio' id='Perfect' name='comfort' value='5'/>
                <span>   Perfect</span>
              </div><br/>
              <div id ='qualityQuestionContainer' onChange={this.formInputSelectionChange}>
                <span className='characteristicTitle'>Quality</span><span>:  {this.state.qualityDisplayValue}</span><br/>
                <br/>
                <span>Poor   </span>
                <input type='radio' id='Poor' name='quality' value='1' required/>
                <input type='radio' id='Below Average' name='quality' value='2'/>
                <input type='radio' id='What I Expected' name='quality' value='3'/>
                <input type='radio' id='Pretty great' name='quality' value='4'/>
                <input type='radio' id='Perfect' name='quality' value='5'/>
                <span>   Perfect</span>
              </div><br/>
              <div id ='lengthQuestionContainer' onChange={this.formInputSelectionChange}>
                <span className='characteristicTitle'>Length</span><span>:  {this.state.lengthDisplayValue}</span><br/>
                <br/>
                <span>Runs Short   </span>
                <input type='radio' id='Runs short' name='length' value='1' required/>
                <input type='radio' id='Runs slightly short' name='length' value='2'/>
                <input type='radio' id='Perfect' name='length' value='3'/>
                <input type='radio' id='Runs slightly long' name='length' value='4'/>
                <input type='radio' id='Runs long' name='length' value='5'/>
                <span>   Runs Long</span>
              </div><br/>
              <div id ='fitQuestionContainer' onChange={this.formInputSelectionChange}>
                <span className='characteristicTitle'>Fit</span><span>:  {this.state.fitDisplayValue}</span><br/>
                <br/>
                <span>Runs Tight   </span>
                <input type='radio' id='Runs tight' name='fit' value='1' required/>
                <input type='radio' id='Runs slightly tight' name='fit' value='2'/>
                <input type='radio' id='Perfect' name='fit' value='3'/>
                <input type='radio' id='Runs slightly loose' name='fit' value='4'/>
                <input type='radio' id='Runs loose' name='fit' value='5'/>
                <span>   Runs Loose</span>
              </div><br/>
              <br/>
            </div>
            <div id= 'reviewTextAnswersContainer'>
              <label htmlFor='summary'> Title your review: </label><br/>
              <textarea id = 'summary' name='summary' onChange = {this.formTextChange} rows='1' cols='62' maxLength='60' value={this.state.summary} placeholder='Example: Best Purchase Ever!' required />
              {/* <span> Current Character Count: {this.state.summaryCharacterCount}</span> */}
              <br/>
              <br/>
              <label htmlFor='body'> Write your review: </label><br/>
              <textarea id = 'body' name='body' onChange = {this.formTextChange} rows='10' cols='100' minLength='50' maxLength= '1000' value={this.state.body} placeholder='Why did you like the product or not?' required /><br/>
              {this.state.bodyCharacterCount >= 50
                ? <span className='disclaimer'>Minimum Reached</span>
                : <span className= 'disclaimer'>Minimum required characters left { 50 - this.state.bodyCharacterCount }</span>
              }
            </div>
            <br/>
            <div id= 'addReviewImagesContainer'>
              <div className='upload-your-photos-label'><b>Upload Your Photos</b></div>
              {this.state.photos.map((photo) => (
                <img src = {photo} key={photo} className= 'form-input addReview-image'/>
              ))}
              <br />
              {this.state.photos.length >= 5 ? null :
                <div>
                  <Track>
                    <div widget='Review Widget'>
                      <input type='file' name='review-upload-photos' className='form-input upload-your-photos' onChange={this.changeFileHandler} multiple />
                    </div>
                  </Track>
                  <Track>
                    <div widget = 'Review Widget'>
                      <button type='button' className='upload-your-photos' onClick={this.imageUpload}>Upload</button>
                    </div>
                  </Track>
                </div>
              }
            </div>
            <br/>
            <div id= 'contactInputsContainer'>
              <label htmlFor = 'nickname'>What is your nickname?</label><br/>
              <textarea id = 'nickname' name='nickname' onChange = {this.formTextChange} rows='1' cols='62' maxLength='60' value={this.state.nickname} placeholder='Example: jackson11!' required /><br/>
              <span className='disclaimer'> For privacy reasons, do not use your full name or email address</span><br/>
              <br/>
              <label htmlFor='email'> Your Email:</label><br/>
              <input type='email' id='email' name='email' onChange = {this.formTextChange} maxLength='60' value={this.state.email} placeholder= 'Example: jackson11@gmail.com'required></input><br/>
              <span className='disclaimer'>For authentication reasons, you will not be emailed</span><br/>
              <br/>
            </div>
            <button onClick = {this.handleSubmit}>Submit Review</button>
          </form>
        </div>
      </div>);
  }
}


export default ReviewFormModal;
