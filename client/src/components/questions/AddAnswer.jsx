import React from 'react';

class AddAnswer extends React.Component {
  render() {
    return (
      <div className={this.props.addAnswerModalOpen ? 'modal display-block' : 'model display-none'}>
        <form>
          <div className='add-form-container'>
            <label htmlFor='your-answer'><b>Your Answer</b></label>
            <br />
            <textarea id='your-answer' name='your-answer' className='form-input' maxlength='1000' required />
            <br />
            <label htmlFor='your-nickname'><b>What is Your Nickname</b></label>
            <br />
            <input type='text' id='your-nickname' name='your-nickname' className='form-input' maxlength='60' required />
            <br />
            <label htmlFor='your-email'><b>Your Email</b></label>
            <br />
            <input type='text' id='your-email' name='your-email' className='form-input' maxlength='60' required />
            <br />
            <button type='button' onClick={this.props.toggleAddAnswerModal}>Submit Answer</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddAnswer;