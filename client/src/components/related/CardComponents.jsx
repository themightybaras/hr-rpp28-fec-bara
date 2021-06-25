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

const Image = ({product}) => {
  let image = 'http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg';
  if (product.results !== undefined) {
    let defaultProduct = _.where(product.results, { 'default?': true});
    if (defaultProduct.length > 0) {
      image = defaultProduct[0].photos[0].thumbnail_url;
    } else {
      image = product.results[0].photos[0].thumbnail_url;
    }
    // image = defaultProduct
    // image = _.where(results, { 'default?': true})[0].photos[0].thumbnail_url;
  }
  return (
    <img className='relatedImage' src={image}></img>
  );
};

const Price = ({product}) => {

  let defaultPrice = product.default_price;
  let salePrice = null;
  // If product.results
  if (product.results) {
    //  Filter product.results for default style
    let defaultProduct = _.where(product.results, { 'default?': true});
    //    If default style exists
    if (defaultProduct.length > 0) {
    //      Set salePrice to default product sale price
      salePrice = defaultProduct[0].sale_price;
    //    Otherwise
    } else {
    //      Set salePrice to first product sale price
      salePrice = product.results[0].sale_price;
    }
  }
  return (
    <p className="productPrice">
      {salePrice ?
        <span>
          <span className="strikethrough">{`$${defaultPrice}`}</span><span className="saleprice">{`$${salePrice}`}</span></span> : <span>{`$${defaultPrice}`}
        </span>}

    </p>
  );
};

const Review = () => {
  return (
    <span>
      review
    </span>
  );
};

export { ActionItem, Image, Price, Review };