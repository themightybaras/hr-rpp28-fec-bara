import React from 'react';
import _ from 'underscore';
import { MdStarBorder } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

// Individual card components
const ActionItem = ({product, actionHandler, icon}) => {

  let actionItemHandler = () => actionHandler(product.id);

  return (
    <span className='actionItem' onClick={actionItemHandler}>
      {icon === 'star' ? <MdStarBorder /> : <TiDeleteOutline />}

    </span>
  );
};

const Image = ({product, clickHandler, icon, actionHandler}) => {
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
    <div className='productImageItem'>
      <img className='relatedImage' src={image} onClick={clickHandler} />
      <span className='cardActionItem'>
        <ActionItem product={product} actionHandler={actionHandler} icon={icon} />
      </span>
      {/* <button className='cardActionItem'> <MdStarBorder /> </button> */}
      {/* conditional (maybe prop) */}
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