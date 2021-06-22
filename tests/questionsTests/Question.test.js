import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Question from '../../client/src/components/questions/Question.jsx';

test('test question block', () => {

  const questionSample = {
    'question_id': 153695,
    'question_body': 'Why is this product cheaper here than other sites?',
    'question_date': '2018-10-18T00:00:00.000Z',
    'asker_name': 'willsmith',
    'question_helpfulness': 4,
    'reported': false,
    'answers': {
      '1444586': {
        'id': 1444586,
        'body': 'We are selling it here without any markup from the middleman!',
        'date': '2018-08-18T00:00:00.000Z',
        'answerer_name': 'Seller',
        'helpfulness': 4,
        'photos': []
      }
    }
  };

  const questionBlock = shallow(
    <Question question={questionSample} />
  );

  expect(questionBlock.find('.question').text()).toBe('Q: Why is this product cheaper here than other sites?');

});
