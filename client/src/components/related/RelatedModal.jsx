import React from 'react';

// Does it make sense to use React.children for the modal?
//    Not sure what's going to be in each one -> could specify that elsewhere and pass as children props

// start with simple modal, see if interaction and display work

// User clicks action item in product card (needs to have toggler passed)
// Click handler sets modal state to true
// Modal display shown
// Modal display clicked
//  Click handler sets modal state to false
// Modal disappears

const RelatedModal = ({modal, actionHandler}) => {
  return (
    <div onClick={actionHandler} className = {modal ? 'modal display-block' : 'modal display-none'}>
      Clicked product vs. Current product
    </div>
  );
};

export default RelatedModal;