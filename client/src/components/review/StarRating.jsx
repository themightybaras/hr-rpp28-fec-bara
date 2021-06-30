
import React from 'react';
import styled from 'styled-components';
import Track from '../../Track.jsx';

const StarDisplay = styled.div`
  background: -webkit-linear-gradient(left, black ${({rating}) => rating * 20}%, white ${({rating}) => rating * 20 }%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`;


const StarRating = (props) => {
  return (
    <StarDisplay widget = 'reviews widget' className = 'stars' rating={props.rating}></StarDisplay>
  );
};


export default StarRating;

