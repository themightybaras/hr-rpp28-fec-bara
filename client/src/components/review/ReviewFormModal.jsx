import React from 'react';


class ReviewFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // REVIEW FORM ANSWERS
      stars: 0,
      starsDisplayAnswer: 'no stars selected',
      recommend: 'unanswered',
      recommendDisplayAnswer: null,
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

    this.formInputSelectionChange = this.formInputSelectionChange.bind(this);
    this.formTextChange = this.formTextChange.bind(this);
  }


  formInputSelectionChange(e) {
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

  formTextChange(e) {
    console.log('text changed');
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
            <div id= 'recommendQuestionContainer' onChange={this.formInputSelectionChange}>
              <h4>Do you recommend this product?</h4>
              <span>{this.state.recommendDisplayValue}</span><br/>
              <input type='radio' id = 'Yes, I recommend this product' name='recommend' value='yes' required/>
              <label htmlFor='Yes, I recommend this product'>Yes</label>
              <input type='radio' id = 'No, I do not recommend this product' name='recommend' value='no'/>
              <label htmlFor='No, I do not recommend this product'>No</label>
            </div>
            <div id='characteristicsQuestionsContainer'>
              <h4>Please Rate The Following Characteristics</h4>
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
            </div>
            <div id= 'reviewTextAnswersContainer'>
              <label htmlFor='summarySentance'> Title you review: </label><br/>
              <textarea id = 'summarySentance' onChange = {this.formTextChange} maxLength='60' placeholder='Example: Best purchase ever!' required />
            </div>
          </form>
          <button onClick = {this.props.onClose}>Close</button>
        </div>
      </div>);
  }
}


export default ReviewFormModal;