import React from 'react';

const CharacteristicBar = (props) => {
  return ( <input type="range" min="0" max="5" defaultValue= {props.pointerValue} className="slider" id="myRange" /> );
};

export default CharacteristicBar;