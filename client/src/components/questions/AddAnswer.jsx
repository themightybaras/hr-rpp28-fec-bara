import React from 'react';

class AddAnswer extends React.Component {
  render() {
    return (
      <div className={this.props.addAnswerModalOpen ? 'modal display-block' : 'model display-none'}>
        <form>
          <div className='add-form-container'>
            <div><b>Your Answer</b></div>
            <textarea name='your-answer' className='form-input' maxLength='1000' required />
            <br />
            <div><b>What is Your Nickname</b></div>
            <input type='text' name='your-nickname' className='form-input' maxLength='60' required />
            <br />
            <div><b>Your Email</b></div>
            <input type='text' name='your-email' className='form-input' maxLength='60' required />
            <br />
            <button type='button' onClick={this.props.toggleAddAnswerModal}>Submit Answer</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddAnswer;