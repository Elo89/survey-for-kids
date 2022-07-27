import surveyConf from './surveyConf';
import {render, fireEvent, waitFor, screen, act, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Survey from './App'

const setInputText = ({
  utils,
  index,
  value,
}: any) => {
  const input = utils.getByTestId(`field-${surveyConf[index].id}`)
  fireEvent.change(input, {target: { value }})
}

const clickNextStep = async (currentIndex: number) => {
  fireEvent.click(screen.getByTestId(`next-questions-${surveyConf[currentIndex].id}`));
}

const checkIsLoading = async (currentIndex: number, utils: any, timeout = 500) => {
  await waitFor(() => {
    expect(utils.getByTestId(`next-questions-${surveyConf[currentIndex].id}`)).toHaveTextContent('loading');
  }, {
    timeout,
  });
}

const stepRadioExecute = async ({ utils, index, valueSelector } : any) => {
  act(() => {
    fireEvent.click(utils.getByTestId(`radio-${valueSelector}`));
  })
  act(() => {
    clickNextStep(index);
  })
}

const stepInputExecute = async ({utils, index, value} : any) => {
  act(() => {
    setInputText({
      utils,
      index,
      value
    })
  })
  act(() => {
    clickNextStep(index);
  })
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// @ts-ignore
const mock = [
  {
    "id": "question1",
    "results": [4]
  },
  {
    "id": "question2",
    "results": ["LEVRAM"]
  },
  {
    "id": "question3",
    "results": [true]
  },
  {
    "id": "question4",
    "results": [true]
  }
];


describe("[Survey] - Components integration", () => {
	beforeEach(() => {
    cleanup();
    jest.useFakeTimers()
  });

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Survey Components', () => {
    it('TEST - correct answers', async () => {
      const component = render(<Survey surveyConf={surveyConf} />)
      const {rerender, ...utils} = component;

      const fetchMock = jest
        .spyOn(global, 'fetch')
        // @ts-ignore
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(mock) }))

      // STEP 1
      await stepInputExecute({
        utils,
        index: 0,
        value: '4',
      })

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
      
      await checkIsLoading(0, utils);
      
      
      await waitFor(() => { 
        expect(screen.getByTestId(`success-questions-${surveyConf[0].id}`)).toHaveTextContent('La risposta è esatta')
      }, {
        timeout: 1500,
      })

      // STEP 2
      await stepInputExecute({
        utils,
        index: 1,
        value: 'LEVRAM',
      })

      await checkIsLoading(1, utils);

      await waitFor(() => { 
        expect(screen.getByTestId(`success-questions-${surveyConf[1].id}`)).toHaveTextContent('La risposta è esatta')
      }, {
        timeout: 1500,
      })
      
      // STEP 3
      stepRadioExecute({
        utils,
        index: 2,
        valueSelector: 'true-si'
      })
      
      await checkIsLoading(2, utils);

      await waitFor(() => { 
        expect(screen.getByTestId(`success-questions-${surveyConf[2].id}`)).toHaveTextContent('La risposta è esatta')
      }, {
        timeout: 1500,
      })
      
      // STEP 4
      stepRadioExecute({
        utils,
        index: 3,
        valueSelector: 'true-Ragnatele'
      })
      
      await checkIsLoading(3, utils);

      await waitFor(() => { 
        expect(screen.getByTestId(`success-questions-${surveyConf[3].id}`)).toHaveTextContent('La risposta è esatta')
      }, {
        timeout: 1500,
      })
    });


    it('TEST - wrong answers', async () => {
      const component = render(<Survey surveyConf={surveyConf} />)
      const {rerender, ...utils} = component;

      const fetchMock = jest
        .spyOn(global, 'fetch')
        // @ts-ignore
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(mock) }))

      // STEP 1
      await stepInputExecute({
        utils,
        index: 0,
        value: '5',
      })

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
      
      await checkIsLoading(0, utils);
      
      await waitFor(() => { 
        expect(screen.getByTestId(`error-questions-${surveyConf[0].id}`)).toHaveTextContent('La risposta è errata')
      }, {
        timeout: 1500,
      })

      // STEP 2
      await stepInputExecute({
        utils,
        index: 1,
        value: 'GJAKDW',
      })

      await checkIsLoading(1, utils);

      await waitFor(() => { 
        expect(screen.getByTestId(`error-questions-${surveyConf[1].id}`)).toHaveTextContent('La risposta è errata')
      }, {
        timeout: 1500,
      })
      
      // STEP 3
      stepRadioExecute({
        utils,
        index: 2,
        valueSelector: 'false-no'
      })
      
      await checkIsLoading(2, utils, 1000);

      await waitFor(() => { 
        expect(screen.getByTestId(`error-questions-${surveyConf[2].id}`)).toHaveTextContent('La risposta è errata')
      }, {
        timeout: 1500,
      })
      
      // STEP 4
      stepRadioExecute({
        utils,
        index: 3,
        valueSelector: 'false-Pupazzi'
      })
      
      await checkIsLoading(3, utils);

      await waitFor(() => { 
        expect(screen.getByTestId(`error-questions-${surveyConf[3].id}`)).toHaveTextContent('La risposta è errata')
      }, {
        timeout: 1500,
      })
      await waitFor(() => { 
        expect(screen.getByTestId(`complete-survey`)).toHaveTextContent('Survey completata')
      }, {
        timeout: 1500,
      })
    });
  }); 
});