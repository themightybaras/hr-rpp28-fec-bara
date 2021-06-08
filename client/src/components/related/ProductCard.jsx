import React from 'react';
import _ from 'underscore';
import {ActionItem, Image, Category, Name, Price, Review} from './CardComponents.jsx';

const ProductCard = ({product}) => {

  // ! revise sale price
  let originalPrice = product.default_price;
  let salePrice;
  if (product.id) {
    salePrice = product.results.sale_price;
  }

  return (
    <div className="productcard">
      <ActionItem />
      <br />
      <Image results={product.results}/>
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