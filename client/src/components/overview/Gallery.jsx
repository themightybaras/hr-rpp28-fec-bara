import React from 'react';
const gallery = (props) => {
  return (
    <div>
      <h2>Gallery</h2>
      {props.render(props.products)}
    </div>
  );
};
export default gallery;