import React from 'react';
const description = (props) => {
  return (
    <div>
      <b>{props.product[props.current].name}</b>
    </div>
  );
};

export default description;
