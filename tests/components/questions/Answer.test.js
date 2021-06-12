import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Answer from '../../../client/src/components/questions/Answer.jsx';

test('test answer block', () => {

  const answerSample = {
    id: 1444586,
    body: 'We are selling it here without any markup from the middleman!',
    date: '2018-08-18T00:00:00.000Z',
    answerer_name: 'Seller',
    helpfulness: 4,
    photos: []
  };

  const answerBlock = shallow(
    <Answer answer={answerSample} />
  );

  expect(answerBlock.find('.answer').text()).toBe('We are selling it here without any markup from the middleman!');

});