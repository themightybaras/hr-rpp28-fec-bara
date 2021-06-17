import React from 'react';

const ClickableStarRating = (props) => {
  return (
    <div className='rating'>
      <input type='radio' id='Great' name='rating' value='5' onClick= {props.collectRating} required/>
      <label htmlFor='Great' title='Great'>5 stars</label>
      <input type='radio' id='Good' name='rating' value='4' onClick= {props.collectRating}/>
      <label htmlFor='Good' title='Good'>4 stars</label>
      <input type='radio' id='Average' name='rating' value='3' onClick= {props.collectRating}/>
      <label htmlFor='Average' title='Average'>3 stars</label>
      <input type='radio' id='Fair' name='rating' value='2' onClick= {props.collectRating}/>
      <label htmlFor='Fair' title='Fair'>2 stars</label>
      <input type='radio' id='Poor' name='rating' value='1' onClick= {props.collectRating}/>
      <label htmlFor='Poor' title='Poor'>1 star</label>
    </div>
  );
};

export default ClickableStarRating;
