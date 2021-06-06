import React from 'react';

// Individual card components
const ActionItem = () => {
  return (
    <span>
        Action Item
    </span>
  );
};
const Image = () => {
  return (
    <img className='relatedImage' src='http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg'></img>
  );
};
const Category = () => {
  return (
    <span>
      category
    </span>
  );
};
const Name = ({name}) => {
  return (
    <span>
      <strong>{name}</strong>
    </span>
  );
};
const Price = () => {
  return (
    <span>
      price
    </span>
  );
};
const Review = () => {
  return (
    <span>
      review
    </span>
  );
};

export { ActionItem, Image, Category, Name, Price, Review };