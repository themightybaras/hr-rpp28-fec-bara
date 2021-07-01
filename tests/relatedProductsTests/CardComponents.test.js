import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import RelatedOutfit from '../../client/src/components/related/RelatedOutfit.jsx';
import ProductCard from '../../client/src/components/related/ProductCard.jsx';
// import ItemsList from '../../client/src/components/related/ItemsList.jsx';
import {ActionItem, Image, Review, Price} from '../../client/src/components/related/CardComponents.jsx';
import ExampleOutfit from './ExampleData.js';

test('Action item should render a span', () => {

  let testCH = () => {};
  let testAI = shallow(
    <ActionItem product={ExampleOutfit.withDefault} actionHandler={testCH}/>
  );
  expect(testAI.find('.actionItem').exists()).toBe(true);
});


test('Price component should show default price when there is no sale price or results array', () => {

  let testPrice = shallow(
    <Price product={ExampleOutfit.noDefault}/>
  );
  let noResults = shallow(
    <Price product={ExampleOutfit.noResults}/>
  );

  expect(testPrice.find('.originalPrice').exists()).toBe(true);
  expect(testPrice.find('.originalPrice').text()).toEqual('$424.00');

});

test('Price component should show sale price when it exists', () => {

  let testPrice = shallow(
    <Price product={ExampleOutfit.withDefault}/>
  );

  expect(testPrice.find('.originalPrice').exists()).toBe(false);
  expect(testPrice.find('.strikethrough').exists()).toBe(true);
  expect(testPrice.find('.saleprice').exists()).toBe(true);
  expect(testPrice.find('.saleprice').text()).toEqual('$300.00');

});

test('Image component renders default product image', () => {

  let defaultThumbnail = 'https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80';

  let testDefault = shallow(
    <Image product={ExampleOutfit.withDefault} clickHandler={() => {}} icon={'star'} actionHandler={() => {}}/>
  );

  expect(testDefault.find('img').prop('src')).toEqual(defaultThumbnail);

});

test('Image component renders first product image when there\'s no default product', () => {

  let noDefaultThumbnail = 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80';

  let testNoDefault = shallow(
    <Image product={ExampleOutfit.noDefault} clickHandler={() => {}} icon={'star'} actionHandler={() => {}}/>
  );
    //    renders image for default product when there is one
  expect(testNoDefault.find('img').prop('src')).toEqual(noDefaultThumbnail);

});

//    renders placeholder image
test('Image component renders default image when there\'s no image available', () => {

  let noImage = 'https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193046540?k=6&m=1193046540&s=170667a&w=0&h=f4NW7AdMrru1TBTUx1NwU6KgEfbf_mT9G4E_ceSMvwg=';

  let testNoImage = shallow(
    <Image product={ExampleOutfit.noImage} clickHandler={() => {}} icon={'star'} actionHandler={() => {}}/>
  );
    //    renders image for default product when there is one
  expect(testNoImage.find('img').prop('src')).toEqual(noImage);

});

test('Review item should render a styled component if there is a ratings object', () => {

  let testReview = shallow(
    <Review product={ExampleOutfit.withDefault} />
  );
  expect(testReview.find('.noReview').exists()).toBe(false);
});

test('Review item should render a message if there is no ratings object or an empty ratings object', () => {

  let noRatings = shallow(
    <Review product={ExampleOutfit.noImage}/>
  );
  let emptyRatings = shallow(
    <Review product={ExampleOutfit.noImage}/>
  );
  expect(noRatings.find('.noReview').exists()).toBe(true);
  expect(emptyRatings.find('.noReview').exists()).toBe(true);
});

