import { cleanup, act, waitFor, renderHook } from "@testing-library/react";
import useCallState from "./useCallState";
import surveyConf from "../../surveyConf";

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

describe("[Survey] - useCallState", () => {
	beforeEach(() => {
    cleanup();
    jest.useFakeTimers()
  });

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

	test("[Survey] - test loading and success message", async () => {
		const { result, rerender } = renderHook(() => useCallState({ survey: surveyConf[0] }));
    const fetchMock = jest
      .spyOn(global, 'fetch')
      // @ts-ignore
      .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(mock) }))
  
		expect(result.current.isLoading).toBe(false)
		expect(result.current.state).toBe('edit')
		expect(result.current.bgColor).toBe('white')
    
		act(() => {
      result.current.onSubmit({ field: '4' })
    })
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true)
    }, {
      timeout: 1000,
    });
    
    await waitFor(() => {
      expect(result.current.state).toBe('success')
      expect(result.current.bgColor).toBe('green')
    }, {
      timeout: 3000,
    });
	});

	test("[Survey] - test loading and error message", async () => {
		const { result, rerender } = renderHook(() => useCallState({ survey: surveyConf[0] }));
    const fetchMock = jest
      .spyOn(global, 'fetch')
      // @ts-ignore
      .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(mock) }))
  
		expect(result.current.isLoading).toBe(false)
		expect(result.current.state).toBe('edit')
		expect(result.current.bgColor).toBe('white')
    
		act(() => {
      result.current.onSubmit({ field: '5' })
    })
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true)
    }, {
      timeout: 1000,
    });
    
    await waitFor(() => {
      expect(result.current.state).toBe('error')
      expect(result.current.bgColor).toBe('red')
    }, {
      timeout: 3000,
    });
	});
});