import React from 'react';
import { GrAdd } from 'react-icons/gr';

const AddOutfitCard = ({addToOutfit}) => {

  return (
    <div className="productcard addoutfit" onClick={addToOutfit}>
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