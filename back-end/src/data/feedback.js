[
  {
    details: {
      title: 'Website Feedback',
      questions: [
        {
          order: 1,
          title: 'How easy was it to find what you were looking for?',
          type: 'range',
          required: true
        },
        {
          order: 2,
          title: 'How would you rate the quality of our website?',
          type: 'selection',
          result: ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'
          ],
          required: true
        },
        {
          order: 3,
          title: 'What features would you like to see in our website?',
          type: 'freeString',
          required: false
        }
      ]
    },
    userList: [
      ObjectId('616308c5b99ca08f5a5e3182'),
      ObjectId('616308c5b99ca08f5a5e3183')
    ],
    answers: [
      {
        user: ObjectId('616308c5b99ca08f5a5e3182'),
        finished: true,
        details: [
          {
            order: 1,
            title: 'How easy was it to find what you were looking for?',
            type: 'range',
            result: 5,
            required: true
          },
          {
            order: 2,
            title: 'How would you rate the quality of our website?',
            type: 'selection',
            result: 'Excellent',
            required: true
          },
          {
            order: 3,
            title: 'What features would you like to see in our website?',
            type: 'freeString',
            required: false
          }
        ]
      },
      {
        user: ObjectId('616308c5b99ca08f5a5e3183'),
        finished: false,
        details: [
          {
            order: 1,
            title: 'How easy was it to find what you were looking for?',
            type: 'range',
            result: 3,
            required: true
          },
          {
            order: 2,
            title: 'How would you rate the quality of our website?',
            type: 'selection',
            result: 'Good',
            required: true
          },
          {
            order: 3,
            title: 'What features would you like to see in our website?',
            type: 'freeString',
            required: false
          }
        ]
      }
    ],
    createBy: ObjectId('616308c5b99ca08f5a5e3184'),
    userType: 'admin',
    createdAt:  ISODate('2023-03-24T00: 00: 00.000Z'),
    updatedAt:  ISODate('2023-03-24T00: 00: 00.000Z'),
    id: ObjectId('616308c5b99ca08f5a5e3185')
  }
]