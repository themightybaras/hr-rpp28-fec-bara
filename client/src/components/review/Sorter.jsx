import React from 'react';
import Track from '../../Track.jsx';

const SortingForm = (props) => {
  return (
    <div widget = {'Review Widget'}>
      <Track>
        <label widget = {'Review Widget'}>
          <span>
            {props.numberOfReviews} reviews, sorted by
          </span>
        </label>
      </Track>
      <select name='sortReviews' id='sortReviews' value={props.sortBy} onChange={props.changeSorting}>
        <option value='relevant'>relevance</option>
        <option value='newest'>date</option>
        <option value='helpful'>helpfulness</option>
      </select>
    </div>
  );
};


export default SortingForm;