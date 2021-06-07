import React from 'react';

// Individual card components
const ActionItem = () => {
  return (
    <span className='actionItem'>
        Action Item
    </span>
  );
};

const Image = () => {
  return (
    <img className='relatedImage' src="https://images.unsplash.com/photo-1477420143023-6a0e0b04b69a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"></img>
  );
};

const Category = ({category}) => {
  return (
    <span>
      {category}
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
const Price = ({price}) => {
  return (
    <span>
      {`$${price}`}
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