import React from 'react';
import axios from 'axios';

const AddOutfitCard = ({addToOutfit}) => {

  let addAndTrack = () => {
    addToOutfit();
    let clickObject = {
      time: new Date (Date.now()),
      widget: 'related widget',
      element: 'div'
    };

    axios.post('/interactions', clickObject )
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="productcard addoutfit" onClick={addAndTrack}>
      <div id='addToOutfitIcon'>
      +
      </div>
      <div id='addToOutfitText'>
        Add this product to your outfit!
      </div>
    </div>
  );

};

export default AddOutfitCard;