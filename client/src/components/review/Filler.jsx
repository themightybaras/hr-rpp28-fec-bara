import React from 'react';

const Filler = (props) => {
  return <div className='filler' style={{width: `${props.percentage * 100}%`}}/>;
};

export default Filler;