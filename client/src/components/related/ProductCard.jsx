import React from 'react';
import {ActionItem, Image, Category, Name, Price, Review} from './CardComponents.jsx';

// takes in product info


// renders image, info, action button
const ProductCard = () => {
  return (
    <div className="productcard">
      <ActionItem />
      <br />
      <Image />
      <br />
      <Category />
      <br />
      <Name />
      <br />
      <Price />
      <br />
      <Review />
    </div>
  );
};

export default ProductCard;