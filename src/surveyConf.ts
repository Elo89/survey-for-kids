const surveyConf = [
  {
    id: 'question1',
    stepName: 'Step 1',
    question: 'Quante sono le tartarughe ninja',
    type: 'number',
    results: [4],
  },
  {
    id: 'question2',
    stepName: 'Step 2',
    question: 'Scrivi MARVEL al contrario',
    type: 'text',
    results: ['LEVRAM'],
  },
  {
    id: 'question3',
    stepName: 'Step 3',
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
  {
    id: 'question4',
    stepName: 'Step 4',
    question: 'Spiderman cosa lancia?',
    type: 'radio',
    results: [true],
    options: [
      {
        value: true,
        text: 'Ragnatele'
      },
      {
        value: false,
        text: 'Pupazzi'
      },
      {
        value: false,
        text: 'Frecce'
      },
      {
        value: false,
        text: 'Raggi laser'
      },
    ]
  },
]

export default surveyConf;