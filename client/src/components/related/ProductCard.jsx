import React from 'react';
import {ActionItem, Image, Category, Name, Price, Review} from './CardComponents.jsx';

// takes in product info


// renders image, info, action button
const ProductCard = ({product}) => {
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
      <Price />
      <br />
      <Review />
    </div>
  );
};

export default ProductCard;