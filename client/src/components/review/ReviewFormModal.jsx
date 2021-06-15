import React from 'react';


class ReviewFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // REVIEW FORM ANSWERS
      stars: 0,
      starsDisplayAnswer: 'no stars selected',
      recommend: 'unanswered',
      recommendDisplayAnswer: 'none selected',
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
      fitDisplayValue: 'none selected'
    };

    this.formInputChange = this.formInputChange.bind(this);

  }


  formInputChange(e) {
    const target = e.target;
    const value = target.value; // number value
    const id = target.id; //string telling user what they selected in english
    const name = target.name; //how it is refered to in state
    const displayName = `${name}DisplayValue`;
    this.setState({
      [name]: value,
      [displayName]: id
    }, () =>{ console.log(this.state); });
  }


  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className = 'modal' id = 'addReviewContainer'>
        <div className = 'addReviewFormContent'>
          <form>
            <h2>Write Your Review About the {this.state.productName}</h2>
            <span>Clickable star ranking goes here</span><br/>
            <div id= 'recommendationQuestionContainer'>
              <h4>Do you recommend this product?</h4>
              <input type='radio' id = 'recommendYes' name='recommend' value='yes' required/>
              <label htmlFor='recommendYes'>Yes</label>
              <input type='radio' id = 'recommendNo' name='recommend' value='no'/>
              <label htmlFor='recommendNo'>No</label>
            </div>
            <div id='characteristicsQuestionsContainer'>
              <h4>Please Rate The Following Characteristics</h4>
              <div id ='sizeQuestionContainer' onChange={this.formInputChange}>
                <span className='characteristicTitle'>Size:</span><span>  {this.state.sizeDisplayValue}</span><br/>
                <span>A size too small   </span>
                <input type='radio' id='A size too small' name='size' value='1'/>
                <input type='radio' id='1/2 a size too small' name='size' value='2'/>
                <input type='radio' id='Perfect' name='size' value='3'/>
                <input type='radio' id='1/2 a size too big' name='size' value='4'/>
                <input type='radio' id='A size too big' name='size' value='5'/>
                <span>   A size too big</span>
              </div>
            </div>
          </form>
          <button onClick = {this.props.onClose}>Close</button>
        </div>
      </div>);
  }
}


export default ReviewFormModal;