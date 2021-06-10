
import React from 'react';
import styled from 'styled-components';

const StarDisplay = styled.div`
  background: -webkit-linear-gradient(left, black ${({rating}) => rating * 20}%, white ${({rating}) => 100 - (rating * 20)}%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`;


const StarRating = (props) => {
  return (
    <StarDisplay className = 'stars' rating={props.rating}></StarDisplay>
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