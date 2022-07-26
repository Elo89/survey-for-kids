import { useCallback, useMemo, useState } from 'react';
import { useSwiper } from 'swiper/react';

interface PropType {
  survey: any,
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function useCallState({ survey }: PropType) {
  const swiper = useSwiper();
  const [state, setState] = useState<'success' | 'error' | 'edit'>('edit');
  const [isLoading, setIsLoading] = useState<boolean>();

  const onSubmit = useCallback(async (data: any) => {
    setIsLoading(true)
    // fake call
    await timeout(1000);
    setIsLoading(false);

    // compare results to answer
    if (data.field.includes(survey.results))
      setState('success');
    else
      setState('error');

    // I send it to the next slide showing the error for 1 sec
    await timeout(1000);
    swiper?.slideNext?.();
  }, [swiper, survey.results])

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
