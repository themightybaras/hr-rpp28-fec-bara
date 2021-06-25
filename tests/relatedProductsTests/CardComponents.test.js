import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import RelatedOutfit from '../../client/src/components/related/RelatedOutfit.jsx';
import ProductCard from '../../client/src/components/related/ProductCard.jsx';
// import ItemsList from '../../client/src/components/related/ItemsList.jsx';
import {ActionItem, Image, Review} from '../../client/src/components/related/CardComponents.jsx';
import ExampleOutfit from './ExampleData.js';

test('Action item should render a span', () => {

  let testCH = () => {};
  let testAI = shallow(
    <ActionItem product={ExampleOutfit.withDefault} actionHandler={testCH}/>
  );
  expect(testAI.find('.actionItem').exists()).toBe(true);
});

// test('Name and Category components render text passed as a prop', () => {
//   let testText = 'Test';
//   let testCategory = shallow(
//     <Category category={testText}/>
//   );
//   let testName = shallow(
//     <Name name={testText}/>
//   );
//   expect(testCategory.text()).toEqual(testText);
//   expect(testName.text()).toEqual(testText);
// });

// test('Price component should show correct price', () => {

//   let testAmt = 999.99;
//   let testPrice = shallow(
//     <Price price={testAmt}/>
//   );

//   expect(testPrice.find('.price-span').text()).toEqual('$' + testAmt);
//   // Add tests for sale price cases
//   //  (shows sale price with struck-through default)
//   //  Way to test color of red?

// });


// Test image
//    renders image for default product when there is one

// test('Image component renders default product image', () => {

//   let defaultThumbnail = 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';

//   let testDefault = shallow(
//     <Image results={ExampleOutfit.withDefault.results}/>
//   );

//   expect(testDefault.find('img').prop('src')).toEqual(defaultThumbnail);

// });
//    renders first image of first product

// test('Image component renders first product image when there\'s no default product', () => {

//   let noDefaultThumbnail = 'https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80';
//   let noImage = 'http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg';

//   let testNoDefault = shallow(
//     <Image results={ExampleOutfit.noDefault.results}/>
//   );
//     //    renders image for default product when there is one
//   expect(testNoDefault.find('img').prop('src')).toEqual(noDefaultThumbnail);

// });

//    renders placeholder image
// test('Image component renders default image when there\'s no image available', () => {

//   let noImage = 'http://d.ibtimes.co.uk/en/full/429795/13-year-old-norwegian-magnus-carlsen-concentrates-during-match-belarus-player-alexei-fedorov.jpg';

//   let testNoImage = shallow(
//     <Image results={ExampleOutfit.noImage.results}/>
//   );
//     //    renders image for default product when there is one
//   expect(testNoImage.find('img').prop('src')).toEqual(noImage);

// });

// Review component
// test('Review item should render a span', () => {

//   let testReview = shallow(
//     <Review />
//   );
//   expect(testReview.find('.review-related').exists()).toBe(true);
// });

