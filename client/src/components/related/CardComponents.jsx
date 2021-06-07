import React from 'react';
import _ from 'underscore';

// Individual card components
const ActionItem = () => {
  return (
    <span className='actionItem'>
        Action Item
    </span>
  );
};

const Image = ({results}) => {
  let image = '';
  if (results !== undefined) {
    let defaultProduct = _.where(results, { 'default?': true});
    if (defaultProduct.length > 0) {
      image = defaultProduct[0].photos[0].thumbnail_url;
    } else {
      image = results[0].photos[0].thumbnail_url;
    }
    // image = defaultProduct
    // image = _.where(results, { 'default?': true})[0].photos[0].thumbnail_url;
  }
  return (
    <img className='relatedImage' src={image}></img>
  );
};

const Category = ({category}) => {
  return (
    <span>
      {category}
    </span>
  );
};
const Name = ({name}) => {
  return (
    <span>
      <strong>{name}</strong>
    </span>
  );
};
const Price = ({price}) => {
  return (
    <span>
      {`$${price}`}
    </span>
  );
};
const Review = () => {
  return (
    <span>
      review
    </span>
  );
};

export { ActionItem, Image, Category, Name, Price, Review };