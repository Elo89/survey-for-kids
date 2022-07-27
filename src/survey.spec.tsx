import surveyConf from './surveyConf';
import {render, fireEvent, waitFor, screen, act, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Survey from './App'
import mock from '../public/assets/mockApi/results.json'

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
  await act(() => {
    fireEvent.click(utils.getByTestId(`radio-${valueSelector}`));
    clickNextStep(index);
  })
}

const stepInputExecute = async ({utils, index, value} : any) => {
  await act(() => {
    const input = utils.getByTestId(`field-${surveyConf[index].id}`)
    fireEvent.change(input, {target: { value }})
    clickNextStep(index);
  })
}

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
      const promise = Promise.resolve()
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

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))

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

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3))
      
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
      
      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(4))

      await checkIsLoading(3, utils);

      await waitFor(() => { 
        expect(screen.getByTestId(`success-questions-${surveyConf[3].id}`)).toHaveTextContent('La risposta è esatta')
      }, {
        timeout: 1500,
      })
      await act(async() => await promise)
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