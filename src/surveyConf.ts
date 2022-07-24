const surveyConf = [
    {
      question: 'risolvi questa operazione 3 + 3',
      type: 'number',
      results: [6],
    },
    {
      question: 'scrivi ciao al contrario',
      type: 'text',
      results: ['oaic'],
    },
    {
      question: 'Quale di questi super eroi hanno il mantello?',
      type: 'checkbox',
      results: ['superman', 'batman'],
      options: [
        {
          value: 'superman',
          text: 'Superman'
        },
        {
          value: 'batman',
          text: 'Batman'
        },
        {
          value: 'ironman',
          text: 'Ironman'
        },
        {
          value: 'spiderman',
          text: 'Spiderman'
        },
      ]
    },
    {
      question: 'Superman può volare?',
      type: 'radio',
      results: [true],
      options: [
        {
          value: true,
          text: 'si'
        },
        {
          value: false,
          text: 'no'
        },
      ]
    },
  ]

  export default surveyConf;