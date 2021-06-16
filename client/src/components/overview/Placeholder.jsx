import React from 'react';

const Placeholder = ({currentProductId}) => {
  return (
    <div>
      <img src={'https://emoji.gg/assets/emoji/7107_Duck.png'}></img>
      {currentProductId}
    </div>
  );
};

export default Placeholder;