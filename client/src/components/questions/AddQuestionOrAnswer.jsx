import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class AddQuestionOrAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: ''
    };
    this.changeContentHandler = this.changeContentHandler.bind(this);
    this.changeNicknameHandler = this.changeNicknameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.clickSubmitHandler = this.clickSubmitHandler.bind(this);
    this.create = this.create.bind(this);
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

  clickSubmitHandler(event) {
    event.preventDefault();
    this.create();
    console.log();
    $('.form-input').val('');
    this.setState({body: '', name:'', email: ''});
    this.props.toggleAddModal(event);
  }

  create() {
    if (this.props.isQuestionModal) {
       var url = 'qa/questions';
       var data = { ...this.state, product_id: this.props.productID };
    } else {
      var url = `/qa/questions/${this.props.questionId}/answers`;
      var data = this.state;
    }
    axios.post(url, data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div className = {this.props.addModalOpen ? 'modal display-block' : 'modal display-none'}>
        <form>
          <div className='add-form-container'>
            <div className='add-your-question-or-answer-label'><b>{this.props.isQuestionModal ? 'Your Question' : 'Your Answer'}</b></div>
            <textarea name='your-question-or-answer' className='form-input' maxLength='1000' onChange={this.changeContentHandler} required />
            <br />
            <div className='add-your-nickname-label'><b>What is Your Nickname</b></div>
            <input type='text' name='your-nickname' className='form-input' maxLength='60' onChange={this.changeNicknameHandler} required />
            <br />
            <div className='add-your-email-label'><b>Your Email</b></div>
            <input type='text' name='your-email' className='form-input' maxLength='60' onChange={this.changeEmailHandler} required />
            <br />
            <button type='button' className='add-question-or-answer-submit' onClick={this.clickSubmitHandler}>{this.props.isQuestionModal ? 'Submit Question' : 'Submit Answer'}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddQuestionOrAnswer;