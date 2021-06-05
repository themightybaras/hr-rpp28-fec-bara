import React from 'react';

// takes in product info

// renders image, info, action button
const ProductCard = () => {
  return (
    <div className="productcard">
      <span>
        Action Item
      </span>
      <br></br>
      <img className='relatedImage' src='http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg'></img>
      <br></br>
      <span>
        category
      </span>
      <br></br>
      <span>
        <strong>name</strong>
      </span>
      <br></br>
      <span>
        price
      </span>
      <br></br>
      <span>
        review
      </span>
    </div>
  );
};

export default ProductCard;