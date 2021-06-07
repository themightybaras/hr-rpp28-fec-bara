
import React from 'react';
import styled from 'styled-components';

const StarRating = (props) => {

  const StarDisplay = styled.div`
    background: linear-gradient(90deg, black ${props.rating / 5 * 100}%, white ${100 - (props.rating / 5 * 100)}%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  return (
    <StarDisplay className = 'stars'></StarDisplay>
  );
};


export default StarRating;

// const StarRating = styled.div`
//   background: linear-gradient(90deg, black ${props.rating}%, white ${100 - props.rating}%);
// `;
/*.stars {
  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;
}

.stars::before {
  content: "★★★★★";
  letter-spacing: 3px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
 */