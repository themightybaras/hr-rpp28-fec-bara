import React from 'react';
import Track from '../../Track.jsx';

// review list will take in props from reviewWidget
// review list will need to map over the props and pass them to individual review as props
var ReviewImages = (props) => {
  return (
    <div className = 'reviewImages'>
      {props.photos.map(photo =>
        <Track key = {photo.id} >
          <div widget = {'Review Widget'} className= 'flexChild'>
            <img src = {photo.url} key = {photo.id} className= 'reviewImage felxChild'/>
          </div>
        </Track>
      )}
    </div>
  );
};

export default ReviewImages;