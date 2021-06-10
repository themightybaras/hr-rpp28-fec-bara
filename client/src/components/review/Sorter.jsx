import React from 'react';


const SortingForm = (props) => {
  return (
    <div>
      <label>
        {props.numberOfReviews} reviews, sorted by
        <select name='sortReviews' id='sortReviews' value={props.sortBy} onChange={props.changeSorting}>
          <option value='relevant'>relevance</option>
          <option value='newest'>date</option>
          <option value='helpful'>helpfulness</option>
        </select>
      </label>
    </div>
  );
};



export default SortingForm;