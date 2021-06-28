import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

const AddOutfitCard = ({addToOutfit}) => {

  return (
    <div className="productcard addoutfit" onClick={addToOutfit}>
      <div id='addToOutfitIcon'>
        <MdAddCircleOutline />
      </div>
      <div id='addToOutfitText'>
        Add this product to your outfit!
      </div>
    </div>
  );

};

export default AddOutfitCard;