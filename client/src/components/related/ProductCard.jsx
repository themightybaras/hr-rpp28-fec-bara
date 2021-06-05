import React from 'react';

// takes in product info

// Individual card components
let ActionItem = () => {
  return (
    <span>
        Action Item
    </span>
  );
};
let Image = () => {
  return (
    <img className='relatedImage' src='http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg'></img>
  );
};
let Category = () => {
  return (
    <span>
      category
    </span>
  );
};
let Name = () => {
  return (
    <span>
      <strong>Name</strong>
    </span>
  );
};
let Price = () => {
  return (
    <span>
      price
    </span>
  );
};
let Review = () => {
  return (
    <span>
      review
    </span>
  );
};
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