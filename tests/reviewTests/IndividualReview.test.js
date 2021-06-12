import React from 'react';
import $ from 'jquery';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import IndividualReview from '../../client/src/components/review/IndividualReview.jsx';

test('should display date in M DD, YYYY format', ()=> {
  const reviewExample = {
    'review_id': 3,
    'rating': 4,
    'summary': 'I am liking these glasses',
    'recommend': false,
    'response': 'Glad you\'re enjoying the product!',
    'body': 'They are very dark. But that\'s good because I\'m in very sunny spots',
    'date': '2019-06-23T00:00:00.000Z',
    'reviewer_name': 'bigbrotherbenjamin',
    'helpfulness': 5,
    'photos': []
  };
  const individualReview = shallow(<IndividualReview review = {reviewExample}/>);
  const date = individualReview.find('.reviewDate');
  expect(date.text()).toEqual('June 23, 2019');
});

// test('should increase helpful number by one when yes is clicked', () => {
//   const reviewExample = {
//     'review_id': 3,
//     'rating': 4,
//     'summary': 'I am liking these glasses',
//     'recommend': false,
//     'response': 'Glad you\'re enjoying the product!',
//     'body': 'They are very dark. But that\'s good because I\'m in very sunny spots',
//     'date': '2019-06-23T00:00:00.000Z',
//     'reviewer_name': 'bigbrotherbenjamin',
//     'helpfulness': 5,
//     'photos': []
//   };
//   const individualReview = shallow(<IndividualReview review = {reviewExample}/>);
//   const helpfulNumberStart = individualReview.find('.helpfulRating');
//   expect(helpfulNumberStart.text()).toEqual('(5)');

//   const yes = individualReview.find('.yesButton');
//   yes.simulate('click');
//   const helpfulNumberEnd = individualReview.find('.helpfulRating');
//   expect(helpfulNumberStart.text()).toEqual('(6)');

// });