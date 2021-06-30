import React from 'react';
import { GrAdd } from 'react-icons/gr';

const AddOutfitCard = ({addToOutfit}) => {

  let addAndTrack = () => {
    addToOutfit();
    console.log('Tracking, widget: ', 'related widget');
    console.log('Tracking, type: ', 'div');

  };

  return (
    <div className="productcard addoutfit" onClick={addAndTrack}>
      <div id='addToOutfitIcon'>
        <GrAdd />
      </div>
      <div id='addToOutfitText'>
        Add this product to your outfit!
      </div>
    </div>
  );

};

export default AddOutfitCard;