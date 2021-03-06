import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Track from '../../Track.jsx';

class AddQuestionOrAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
      selectedFiles: null,
      photos: []
    };
    this.changeContentHandler = this.changeContentHandler.bind(this);
    this.changeNicknameHandler = this.changeNicknameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeFileHandler = this.changeFileHandler.bind(this);
    this.clickUploadPhotosHandler = this.clickUploadPhotosHandler.bind(this);
    this.clickSubmitHandler = this.clickSubmitHandler.bind(this);
    this.isFormValidated = this.isFormValidated.bind(this);
    this.Upload = this.Upload.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createUploadPhotoErrMsg = this.createUploadPhotoErrMsg.bind(this);
    this.createErrMsg = this.createErrMsg.bind(this);
  }

  changeContentHandler(event) {
    event.preventDefault();
    this.setState({body: event.target.value});
  }

  changeNicknameHandler(event) {
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  changeEmailHandler(event) {
    event.preventDefault();
    this.setState({email: event.target.value});
  }

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
    let formId = document.querySelector(`#answer-${this.props.question.question_id}-form`);
    let formInput = formId.getElementsByClassName('form-input');
    if (formInput['answer-upload-photos']) {
      let imageFileInfo = formInput['answer-upload-photos'].files;
      if (imageFileInfo) {
        let errMessage = this.createUploadPhotoErrMsg(imageFileInfo);
        if (errMessage !== '') {
          alert(errMessage);
        } else {
          this.imageUpload();
        }
      }
    }
  }

  clickSubmitHandler(event) {
    event.preventDefault();
    if (this.isFormValidated()) {
      this.Upload();
      this.props.toggleAddModal(event);
    }
  }

  isFormValidated() {
    if (this.props.isQuestionModal) {
      var formId = document.querySelector('#question-form');
    } else {
      var formId = document.querySelector(`#answer-${this.props.question.question_id}-form`);
    }
    var formInput = formId.getElementsByClassName('form-input');
    var isBodyMissing = formInput['your-question-or-answer'].validity.valueMissing;
    var isNameMissing = formInput['your-nickname'].validity.valueMissing;
    var isEmailMissing = formInput['your-email'].validity.valueMissing;
    var isEmailFormatIncorrect = formInput['your-email'].validity.typeMismatch;
    var errMessage = this.createErrMsg(this.props.isQuestionModal, isBodyMissing, isNameMissing, isEmailMissing, isEmailFormatIncorrect);
    if (errMessage !== '') {
      alert(errMessage);
      return false;
    }
    return true;
  }

  Upload() {
    if (this.props.isQuestionModal) {
      var url = '/qa/questions';
      var data = { 'body': this.state.body, 'name': this.state.name, 'email': this.state.email, 'product_id': this.props.currentProductId };
    } else {
      var url = `/qa/questions/${this.props.question.question_id}/answers`;
      var data = { 'body': this.state.body, 'name': this.state.name, 'email': this.state.email, 'photos': this.state.photos };
    }
    axios.post(url, data)
      .then(() => {
        this.clearForm();
        this.props.fetchQuestions();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  imageUpload() {
    const data = new FormData();
    if (this.state.selectedFiles) {
      this.state.selectedFiles.forEach((file) => {
        data.append('answerPhotos', file);
      });
    }
    axios.post('/qa/photos', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        this.setState({photos: [...this.state.photos, ...response.data]});
      })
      .catch(() => {
        console.log('ERROR: Image Upload Failed!');
      });
  }

  clearForm() {
    $('.form-input').val('');
    this.setState({body: '', name: '', email: '', photos: []});
  }

  closeModal(event) {
    event.preventDefault();
    this.clearForm();
    this.props.toggleAddModal(event);
  }

  createUploadPhotoErrMsg(imageFileInfo) {
    var uploadPhotoErrMessage = '';
    if (imageFileInfo) {
      if (this.state.photos.length + imageFileInfo.length > 5) {
        uploadPhotoErrMessage += 'You can only upload a maxium of 5 images.\n';
      }
      for (let i = 0; i < imageFileInfo.length; i++) {
        let imageFileType = imageFileInfo[i].type;
        if (imageFileType !== 'image/jpeg' && imageFileType !== 'image/png') {
          uploadPhotoErrMessage += 'You can only upload jpg, jpeg or png file.\n';
          break;
        }
      }
    }
    return uploadPhotoErrMessage;
  }

  createErrMsg(isQuestionModal, isBodyMissing, isNameMissing, isEmailMissing, isEmailFormatIncorrect) {
    var errMessage = '';
    if (isBodyMissing || isNameMissing || isEmailMissing) {
      errMessage += 'You must enter the following: \n';
      if (isBodyMissing) {
        if (isQuestionModal) {
          errMessage += '  Your Question \n';
        } else {
          errMessage += '  Your Answer \n';
        }
      }
      if (isNameMissing) {
        errMessage += '  Your Nickname \n';
      }
      if (isEmailMissing) {
        errMessage += '  Your Email \n';
      }
      errMessage += '\n';
    }
    if (!isEmailMissing && isEmailFormatIncorrect) {
      errMessage += 'You must enter a valid email address.\n\n';
    }
    return errMessage;
  }

  render() {
    return (
      <div className = {this.props.addModalOpen ? 'modal display-block' : 'modal display-none'}>
        <form id={this.props.isQuestionModal ? 'question-form' : `answer-${this.props.question.question_id}-form`}>
          <div className='add-form-container'>
            <Track>
              <div widget = 'Questions Widget'>
                <button type='button' className='close-modal' onClick={this.closeModal} >&times;</button>
              </div>
            </Track>
            <h2 className='modal-title-question-or-answer'>{this.props.isQuestionModal ? 'Ask Your Question' : 'Submit Your Answer'}</h2>
            <h4 className='modal-subtitle-question-or-answer'>{this.props.isQuestionModal ? `About the ${this.props.currentProductName}` : `${this.props.currentProductName}: ${this.props.question.question_body}`}</h4>
            <div className='add-your-question-or-answer-label'><b>{this.props.isQuestionModal ? 'Your Question*' : 'Your Answer*'}</b></div>
            <textarea name='your-question-or-answer' className='form-input' maxLength='1000' onChange={this.changeContentHandler} required />
            <br />
            <br />
            <div className='add-your-nickname-label'><b>What is Your Nickname*</b></div>
            <input type='text' name='your-nickname' className='form-input' maxLength='60' onChange={this.changeNicknameHandler} placeholder='Example: jack543!' required />
            <br />
            <div className='footnote'>For privacy reasons, do not use your full name or email address.</div>
            <br />
            <div className='add-your-email-label'><b>Your Email*</b></div>
            <input type='email' name='your-email' className='form-input' maxLength='60' onChange={this.changeEmailHandler} placeholder='Example: jack@email.com' required />
            <br />
            <div className='footnote'>For authentication reasons, you will not be emailed.</div>
            <br />
            {this.props.isQuestionModal ?
              null :
              <div>
                <div className='upload-your-photos-label'><b>Upload Your Photos</b></div>
                {this.state.photos.map((photo) => (
                  <img src = {photo} key={photo} className= 'answer-image'/>
                ))}
                {this.state.photos.length >= 5 ? null :
                  <div>
                    <Track>
                      <div widget='Questions Widget'>
                        <input type='file' name='answer-upload-photos' className='form-input' onChange={this.changeFileHandler} multiple />
                      </div>
                    </Track>
                    <Track>
                      <div widget = 'Questions Widget'>
                        <button type='button' className='upload-photos-button' onClick={this.clickUploadPhotosHandler}>Upload</button>
                      </div>
                    </Track>
                  </div>}
              </div>}
            <br />
            <Track>
              <div widget = 'Questions Widget'>
                <button type='button' className='submit-question-or-answer-button' onClick={this.clickSubmitHandler}>{this.props.isQuestionModal ? 'Submit Question' : 'Submit Answer'}</button>
              </div>
            </Track>
            <br />
          </div>
        </form>
      </div>
    );
  }
}


export default AddQuestionOrAnswer;
