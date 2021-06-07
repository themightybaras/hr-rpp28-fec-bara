import React from 'react';
import _ from 'underscore';
import {ActionItem, Image, Category, Name, Price, Review} from './CardComponents.jsx';

// takes in product info
const backupImage = 'http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg';

// renders image, info, action button
const ProductCard = ({product}) => {

  // Need default item for price AND image
  //    Not going to change at this point, so no need for state
  let defaultProduct = _.where(product.results, {'default?': true})[0];
  if (!defaultProduct && product.id) {
    defaultProduct = product.results[0];
  }
  // Define variables for price and image
  let originalPrice = product.default_price;
  let salePrice;
  if (product.id) {
    salePrice = product.results.sale_price;
  }

  //    use main price and placeholder image, replace if there is a default product
  console.log('Current product: ', product.id);
  console.log('Default product: ', defaultProduct);
  console.log('Original Price: ', originalPrice);
  console.log('Sale Price: ', salePrice);

  // If no default product, then use first
  // if still no product, return

  return (
    <div className="productcard">
      <ActionItem />
      <br />
      <Image />
      <br />
      <Category category={product.category}/>
      <br />
      <Name name={product.name}/>
      <br />
      <Price price={product.default_price}/>
      <br />
      <Review />
    </div>
  );
};

export default ProductCard;