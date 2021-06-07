import React from 'react';
const gallery = (props) => {
  return (
    <div>
      <h2>Gallery</h2>
      <div>{props.render(props.products)}</div>
    </div>
  );
};
export default gallery;