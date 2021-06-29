import React from 'react';
import _ from 'underscore';
import { MdStarBorder } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import StarRating from '../review/StarRating.jsx';

// INDIVIDUAL CARD COMPONENTS

const ActionItem = ({product, actionHandler, icon}) => {

  let actionItemHandler = () => actionHandler(product.id);

  return (
    <span className='actionItem' onClick={actionItemHandler}>
      {icon === 'star' ? <MdStarBorder /> : <TiDeleteOutline />}
    </span>
  );
};

const Image = ({product, clickHandler, icon, actionHandler}) => {
  // Backup image
  let image = 'https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193046540?k=6&m=1193046540&s=170667a&w=0&h=f4NW7AdMrru1TBTUx1NwU6KgEfbf_mT9G4E_ceSMvwg=';

  if (product.results[0].photos[0]) {
    image = product.results[0].photos[0].url;
  }

  return (
    <div className='productImageItem'>
      <img className='relatedImage' src={image} onClick={clickHandler} />
      <span className='cardActionItem'>
        <ActionItem product={product} actionHandler={actionHandler} icon={icon} />
      </span>
    </div>
  );
};

const Price = ({product}) => {

  let defaultPrice = product.default_price;
  let salePrice = null;
  if (product.results) {
    let defaultProduct = _.where(product.results, { 'default?': true});
    if (defaultProduct.length > 0) {
      salePrice = defaultProduct[0].sale_price;
    } else {
      salePrice = product.results[0].sale_price;
    }
  }
  return (
    <p className="productPrice">
      {salePrice ?
        <span><span className="strikethrough">{`$${defaultPrice}`}</span><span className="saleprice">{`$${salePrice}`}</span></span> :
        <span className='originalPrice'>{`$${defaultPrice}`}</span>}
    </p>
  );
};

const Review = ({product}) => {

  let ratings = product.ratings;

  let ratingsCount = 0;
  let ratingsSum = 0;

  if (ratings) {
    if (Object.keys(ratings).length > 0) {
      for (var key in ratings) {
        let numRatings = Number(ratings[key]);
        ratingsCount += numRatings;
        ratingsSum += numRatings * key;
      }
    }
  }

  let finalRating = ratingsCount > 0 ? ratingsSum / ratingsCount : -1;

  if (finalRating === -1) {
    return (
      <span className='noReview'> No Reviews For This Product </span>
    );
  } else {
    return (
      <StarRating rating={finalRating}/>
    );
  }
};

export { ActionItem, Image, Price, Review };