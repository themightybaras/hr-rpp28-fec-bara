import React from 'react';
import _ from 'underscore';

// Individual card components
const ActionItem = ({product, actionHandler}) => {

  let actionItemHandler = () => actionHandler(product.id);

  return (
    <span className='actionItem' onClick={actionItemHandler}>
        Action Item
    </span>
  );
};

const Image = ({results}) => {
  let image = 'http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg';
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

const Review = () => {
  return (
    <span>
      review
    </span>
  );
};

export { ActionItem, Image, Review };