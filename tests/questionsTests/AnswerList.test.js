import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import AnswerList from '../../client/src/components/questions/AnswerList.jsx';


test('test answer list block', () => {

  const oneAnswerSample = [{
    'id': 1444586,
    'body': 'We are selling it here without any markup from the middleman!',
    'date': '2018-08-18T00:00:00.000Z',
    'answerer_name': 'Seller',
    'helpfulness': 4,
    'photos': []
  }];

  const twoAnswersSample = [{
    'id': 1444588,
    'body': 'Some of the seams started splitting the first time I wore it!',
    'date': '2019-11-28T00:00:00.000Z',
    'answerer_name': 'sillyguy',
    'helpfulness': 6,
    'photos': []
  }, {
    'id': 1444596,
    'body': '9 lives',
    'date': '2019-11-12T00:00:00.000Z',
    'answerer_name': 'iluvdogz',
    'helpfulness': 31,
    'photos': ['https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80']
  }];

  const threeAnswersSample = [{
    'id': 1444528,
    'body': 'I\'ve thrown it in the wash and it seems fine',
    'date': '2017-01-04T00:00:00.000Z',
    'answerer_name': 'skilover',
    'helpfulness': 1,
    'photos': ['https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80']
  }, {
    'id': 1444529,
    'body': 'It says not to',
    'date': '2017-01-04T00:00:00.000Z',
    'answerer_name': 'skilover',
    'helpfulness': 2,
    'photos': []
  }, {
    'id': 1444530,
    'body': 'Yes',
    'date': '2017-01-04T00:00:00.000Z',
    'answerer_name': 'skilover',
    'helpfulness': 3,
    'photos': []
  }];

  const oneAnswerBlock = shallow(
    <AnswerList answers={oneAnswerSample} />
  );

  const twoAnswersBlock = shallow(
    <AnswerList answers={twoAnswersSample} />
  );

  const threeAnswersBlock = shallow(
    <AnswerList answers={threeAnswersSample} />
  );

  expect(oneAnswerBlock.find('.more-answers-button').exists()).toBe(false);
  expect(twoAnswersBlock.find('.more-answers-button').exists()).toBe(false);
  expect(threeAnswersBlock.find('.more-answers-button').text()).toBe('SEE MORE ANSWERS');

});