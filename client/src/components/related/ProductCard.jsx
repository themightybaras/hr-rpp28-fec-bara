import React from 'react';
import {ActionItem, Image, Category, Name, Price, Review} from './CardComponents.jsx';

// takes in product info


// renders image, info, action button
const ProductCard = ({name, image}) => {
  return (
    <div className="productcard">
      <ActionItem />
      <br />
      <Image />
      <br />
      <Category />
      <br />
      <Name name={name}/>
      <br />
      <Price />
      <br />
      <Review />
    </div>
  );
};

export default ProductCard;