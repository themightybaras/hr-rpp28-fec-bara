import React from 'react';
const gallery = (props) => {
  return (
    <div>
      {props.render(props.products, props.styles, props.current)}
    </div>
  );
};
export default gallery;