import { useCallback, useMemo, useState } from 'react';
import { useSwiper } from 'swiper/react';

const mockPath = process.env.PUBLIC_URL + '/assets/mockApi/';

interface PropType {
  survey: any,
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function useCallState({ survey }: PropType) {
  const swiper = useSwiper();
  const [state, setState] = useState<'success' | 'error' | 'edit'>('edit');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (data: any) => {
    setIsLoading(true)
    // fake call
    const results  = await fetch(`${mockPath}results.JSON`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => data) as any[];

    await timeout(1000);
    setIsLoading(false);

    // compare results to answer
    if (data.field.includes(results.find(({ id }) => id === survey.id )?.results))
      setState('success');
    else
      setState('error');

    // I send it to the next slide showing the error for 1 sec
    await timeout(1000);
    swiper?.slideNext?.();
  }, [swiper, survey.id])

  const bgColor = useMemo(() => {
    if(state === 'edit')
      return 'white';
    if(state === 'success')
      return 'green';
    return 'red';
  }, [state]);

  return ({ 
    onSubmit,
    bgColor,
    state,
    isLoading,
  });
}

export default useCallState;
