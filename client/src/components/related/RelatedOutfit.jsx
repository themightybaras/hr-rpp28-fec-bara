import React from 'react';
import ItemsList from './ItemsList.jsx';

// Main container for all components related to related products and outfit
// Functional stateless component
// Accepts click handler to reset current product (pass to related [and outfit - check documentation] and then to individual Cards)
// this component will be called in App.jsx

// Could use one ocmponent that handles both related products and outfits
//  If you make API call for related product info, will need if statement (don't make API call if Outfit...) vice versa for outfit request
// The more I think about it, I like idea of a single carousel component with two separate methods for API calls

// Outfit component will make get request with cookies, server will parse and make necessary get requests to the API
// return two carousel components



const RelatedOutfit = () => {
  return (
    <div id='relatedWidget'>
      <ItemsList list='related'/>
      <ItemsList list='outfit'/>
    </div>
  );
};

export default RelatedOutfit;