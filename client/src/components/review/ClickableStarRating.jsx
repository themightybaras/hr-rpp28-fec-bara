import React from 'react';

const ClickableStarRating = (props) => {
  return (
    <div className='rating'>
      <input type='radio' id='Great' name='rating' value='5' onClick= {props.collectRating} required/>
      <label htmlFor='Great' title='text'>5 stars</label>
      <input type='radio' id='Good' name='rating' value='4' onClick= {props.collectRating}/>
      <label htmlFor='Good' title='text'>4 stars</label>
      <input type='radio' id='Average' name='rating' value='3' onClick= {props.collectRating}/>
      <label htmlFor='Average' title='text'>3 stars</label>
      <input type='radio' id='Fair' name='rating' value='2' onClick= {props.collectRating}/>
      <label htmlFor='Fair' title='text'>2 stars</label>
      <input type='radio' id='Poor' name='rating' value='1' onClick= {props.collectRating}/>
      <label htmlFor='Poor' title='text'>1 star</label>
    </div>
  );
};

export default ClickableStarRating;
