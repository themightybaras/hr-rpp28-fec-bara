import React from 'react';

const AddOutfitCard = ({addToOutfit}) => {

  return (
    <div className="productcard addoutfit" onClick={addToOutfit}>
      Click here to add this product to your outfit!
    </div>
  );

};

export default AddOutfitCard;