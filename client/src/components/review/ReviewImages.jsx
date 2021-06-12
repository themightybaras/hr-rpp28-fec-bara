import React from 'react';


// review list will take in props from reviewWidget
// review list will need to map over the props and pass them to individual review as props
var ReviewImages = (props) => {
  return (
    <div className = 'reviewImages'>
      {props.photos.map(photo =>
        <img src = {photo.url} className= 'reviewImage'/>
      )}
    </div>
  );
};

export default ReviewImages;