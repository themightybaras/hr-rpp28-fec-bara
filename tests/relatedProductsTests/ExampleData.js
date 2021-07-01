
module.exports.withDefault = {
  id: 22222,
  campus: 'hr-rpp',
  name: 'Ernesto Backpack',
  slogan: 'Non corrupti optio.',
  ratings: {1: '2', 2: '3', 4: '1'},
  'default_price': '389.00',
  description: 'Hic distinctio corrupti amet inventore. Non provident voluptas amet dolorem officia. Aspernatur sed quo nesciunt dolorem ipsum ut repellendus sunt.',
  category: 'Backpack',
  'default_price': '424.00',
  'created_at': '2021-03-18T16:09:31.545Z',
  'updated_at': '2021-03-18T16:09:31.545Z',
  features: [
    { feature: 'Cut', value: '"Loose"' },
    { feature: 'Cut', value: '"Loose"' },
    { feature: 'Cut', value: '"Skinny"'},
    { feature: 'Lifetime Guarantee', value: null }
  ],
  'product_id': '22222',
  results: [
    {
      'style_id': 123792,
      name: 'Salmon',
      'original_price': '424.00',
      'sale_price': '300.00',
      'default?': true,
      photos: [
        {
          'thumbnail_url': 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80'
        }
      ],
      skus: { '718142': [Object] }
    },
    {
      'style_id': 123793,
      name: 'Sky blue',
      'original_price': '424.00',
      'sale_price': null,
      'default?': false,
      photos: [
        {
          'thumbnail_url': 'https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80'
        }
      ],
      skus: { '718143': [Object] }
    }
  ]
};

module.exports.noDefault = {
  id: 22222,
  campus: 'hr-rpp',
  name: 'Ernesto Backpack',
  slogan: 'Non corrupti optio.',
  ratings: {},
  description: 'Hic distinctio corrupti amet inventore. Non provident voluptas amet dolorem officia. Aspernatur sed quo nesciunt dolorem ipsum ut repellendus sunt.',
  category: 'Backpack',
  'default_price': '424.00',
  'created_at': '2021-03-18T16:09:31.545Z',
  'updated_at': '2021-03-18T16:09:31.545Z',
  features: [
    { feature: 'Cut', value: '"Loose"' },
    { feature: 'Lifetime Guarantee', value: null },
    { feature: 'Non-GMO', value: null }
  ],
  'product_id': '22222',
  results: [
    {
      'style_id': 123793,
      name: 'Sky blue',
      'original_price': '424.00',
      'sale_price': null,
      'default?': false,
      photos: [
        {
          'thumbnail_url': 'https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80'
        }
      ],
      skus: { '718143': [Object] }
    },
    {
      'style_id': 123792,
      name: 'Salmon',
      'original_price': '424.00',
      'sale_price': null,
      'default?': false,
      photos: [
        {
          'thumbnail_url': 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=977&q=80'
        }
      ],
      skus: { '718142': [Object] }
    }
  ]
};

module.exports.noImage = {
  id: 22222,
  campus: 'hr-rpp',
  name: 'Ernesto Backpack',
  slogan: 'Non corrupti optio.',
  description: 'Hic distinctio corrupti amet inventore. Non provident voluptas amet dolorem officia. Aspernatur sed quo nesciunt dolorem ipsum ut repellendus sunt.',
  category: 'Backpack',
  'default_price': '424.00',
  'created_at': '2021-03-18T16:09:31.545Z',
  'updated_at': '2021-03-18T16:09:31.545Z',
  // features: [
  //   { feature: 'Cut', value: '"Loose"' },
  //   { feature: 'Lifetime Guarantee', value: null }
  // ],
  'product_id': '22222',
  results: [
    {
      'style_id': 123793,
      name: 'Sky blue',
      'original_price': '424.00',
      'sale_price': null,
      'default?': false,
      photos: [],
      skus: { '718143': [Object] }
    },
    {
      'style_id': 123792,
      name: 'Salmon',
      'original_price': '424.00',
      'sale_price': null,
      'default?': false,
      photos: [],
      skus: { '718142': [Object] }
    }
  ]
};

module.exports.noResults = {
  id: 22222,
  campus: 'hr-rpp',
  name: 'Ernesto Backpack',
  slogan: 'Non corrupti optio.',
  description: 'Hic distinctio corrupti amet inventore. Non provident voluptas amet dolorem officia. Aspernatur sed quo nesciunt dolorem ipsum ut repellendus sunt.',
  category: 'Backpack',
  'default_price': '424.00',
  'created_at': '2021-03-18T16:09:31.545Z',
  'updated_at': '2021-03-18T16:09:31.545Z',
  'product_id': '22222',
};
