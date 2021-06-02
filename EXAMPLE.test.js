var add = (a, b) => {
  return a + b;
};

test('add adds two numbers together', () => {
  expect(add(1, 2)).toBe(3);
});

// //fail
// test('add adds two numbers together', () => {
//   expect(add(1, 2)).toBe(4);
// });

//testing pull request with CircleCI
//added Husky

