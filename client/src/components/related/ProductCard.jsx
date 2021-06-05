import React from 'react';

// takes in product info

// renders image, info, action button
const ProductCard = () => {
  return (
    <div className="productcard">
      <div>
        Action Item
      </div>
      <img className='relatedImage' src='http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg'></img>
      <div>
        category
      </div>
      <div>
        name
      </div>
      <div>
        price
      </div>
      <div>
        review
      </div>
    </div>
  );
};

export default ProductCard;